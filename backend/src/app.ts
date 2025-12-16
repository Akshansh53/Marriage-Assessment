import "dotenv/config";
import "./auth/passport";
import express from "express";
import cors from "cors"
import session from "express-session";
import passport from "passport";
import "./auth/passport"
import routes from "./routes";


const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use(
  session({
    secret: "dev-secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);


app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(8080,()=>{
    console.log("BACKEND RUNNING ON PORT 8080");
})

export default app;