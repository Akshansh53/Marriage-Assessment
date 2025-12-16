import { Router } from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { eq } from "drizzle-orm";
import { db } from "../database";
import { users } from "../database/schema/schema";
import { registerSchema,loginSchema } from "@anshverma53/marriage-common";

const authRouter = Router();


//register user
authRouter.post("/register", async (req, res) => {
  const parsed =registerSchema.safeParse(req.body);
  if(!parsed.success){
    return res.status(400).json({message:"Email and Password are Invalid"})
  }
  const { email, password } = parsed.data;
  const existing = await db.select().from(users)
    .where(eq(users.email, email)).then((rows) => {
      return rows[0];
  });

  if (existing) {
    return res.status(409).json({ message: "User already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const [user] = await db
    .insert(users)
    .values({ email, password:passwordHash })
    .returning();

  res.status(201).json({
    id: user.id,
    email: user.email,
  });
});

//login user
authRouter.post(
  "/login",
  (req, res, next) => {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message:"Email and Password are Invalid"
      });
    }
    req.body = parsed.data;
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    res.json({
      id: req.user!.id,
      email: req.user!.email,
    });
  }
);


//check user
authRouter.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  res.json(req.user);
});

//Logout user
authRouter.post("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

export default authRouter;
