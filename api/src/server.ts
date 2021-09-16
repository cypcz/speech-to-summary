import cors from "cors";
import express from "express";
import session from "express-session";
import { passport } from "./lib/auth";
import authRouter from "./routes/auth";
import summaryRouter from "./routes/summary";
import taskRouter from "./routes/task";
import { SESSION_SECRET } from "./utils/env";

const app = express();

app.use(express.json());
// app.use(pino());
app.use(cors({ origin: "*" }));
app.use(
  session({
    secret: SESSION_SECRET,
    cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 * 10 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/summary", summaryRouter);
app.use("/tasks", taskRouter);

app.listen(4000);
