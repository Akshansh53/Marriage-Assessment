import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

//Users Table

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: varchar("email", { length: 255 })
    .notNull()
    .unique(),

  password: varchar("password", { length: 255 })
    .notNull(),

  role: varchar("role", { length: 50 })
    .default("user"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

//Venue table

export const venues = pgTable("venues", {
  id: uuid("id").defaultRandom().primaryKey(),

  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  name: varchar("name", { length: 255 })
    .notNull(),

  description: text("description"),

  city: varchar("city", { length: 100 }),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

//venue images

export const venueImages = pgTable("venue_images", {
  id: uuid("id").defaultRandom().primaryKey(),

  venueId: uuid("venue_id")
    .notNull()
    .references(() => venues.id, { onDelete: "cascade" }),

  imageUrl: varchar("image_url", { length: 500 })
    .notNull(),

  publicId: varchar("public_id", { length: 255 }),

  filename: varchar("filename", { length: 255 }),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});
