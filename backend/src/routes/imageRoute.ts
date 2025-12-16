import { Router } from "express";
import multer from "multer";
import { eq } from "drizzle-orm";
import { db } from "../database";
import { venues, venueImages } from "../database/schema/schema";
import cloudinary from "../cloudinary";
import { uploadImagesSchema } from "@anshverma53/marriage-common";
const imageRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

//  Upload images for a venue
imageRouter.post(
  "/venues/:venueId/images",
  upload.array("images", 3),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Login required" });
      }
      const parsed=uploadImagesSchema.safeParse(req.params)
      if(!parsed.success){
        return res.status(400).json({message:"Invalid ID"})
      }
      const { venueId } = parsed.data
      const venue = await db.query.venues.findFirst({
        where: eq(venues.id, venueId),
      });

      if (!venue) {
        return res.status(404).json({ message: "Venue not found" });
      }

      if (venue.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Not allowed" });
      }

      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No images uploaded" });
      }

      // Save image records (fake URLs for now)
      const uploadedImages = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          {
            folder: "venues",
          }
        );

        uploadedImages.push({
          venueId,
          imageUrl: result.secure_url,
          publicId: result.public_id,
        });
      }
    const savedImages = await db
    .insert(venueImages)
    .values(uploadedImages)
    .returning();

      res.status(201).json(uploadedImages);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

export default imageRouter;
