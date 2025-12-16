import { Request, Response, NextFunction } from "express";
import { eq } from "drizzle-orm";

import { db } from "../database";
import { venues } from "../database/schema/schema";

export async function ownerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { venueId } = req.params;

    if (!venueId) {
      return res.status(400).json({ message: "Venue ID is required" });
    }

    // Fetch venue
    const venue = await db.query.venues.findFirst({
      where: eq(venues.id, venueId),
    });

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

// Ownership check
    if (venue.ownerId !== req.user!.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ownership check failed" });
  }
}
