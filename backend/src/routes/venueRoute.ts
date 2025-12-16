import { Router } from "express";
import { eq,and } from "drizzle-orm";
import { db } from "../database";
import { venues,venueImages } from "../database/schema/schema";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createVenueSchema } from "@anshverma53/marriage-common";
import { inArray } from "drizzle-orm";
const venueRouter = Router();

//create Venue
venueRouter.post("/createvenue", authMiddleware, async (req, res) => {
  try {
    const parsed=createVenueSchema.safeParse(req.body)
    if(!parsed.success){
      return res.status(400).json({message:"Invalid Input"});
    }
    const { name, description, city } = parsed.data;
  // const existingVenue = await db.query.venues.findFirst({
  // where: and(
  //   eq(venues.name, name),
  //   eq(venues.description, description),
  //   eq(venues.city, city),
  // ),
// });

    
    const [venue] = await db
      .insert(venues)
      .values({
        name,
        description,
        city,
        ownerId: req.user!.id,
      })
      .returning();

    return res.status(201).json(venue);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create venue" });
  }
});

//get Venue
venueRouter.get("/mine", authMiddleware, async (req, res) => {
  try {
    const myVenues = await db
  .select()
  .from(venues)
  .where(eq(venues.ownerId, req.user!.id));

const venueIds = myVenues.map(v => v.id);

const images = await db
  .select()
  .from(venueImages)
  .where(inArray(venueImages.venueId, venueIds));

const venuesWithImages = myVenues.map(venue => ({
  ...venue,
  images: images
    .filter(img => img.venueId === venue.id)
    .map(img => img.imageUrl),
}));

return res.json(venuesWithImages);

    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch venues" });
  }
});

export default venueRouter;
