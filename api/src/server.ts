import PgStore from "connect-pg-simple";
import cors from "cors";
import express from "express";
import session from "express-session";
import { loggedInGuard, passport } from "./lib/auth";
import { router as authRouter } from "./routes/auth";
import { router as summaryRouter } from "./routes/summary";
import { router as taskRouter } from "./routes/task";
import { DATABASE_URL, FE_ORIGIN, NODE_ENV, SESSION_SECRET } from "./utils/env";

const SessionStore = PgStore(session);

const app = express();

app.use(express.json());
// app.use(pino());
app.use(
  cors({
    origin: FE_ORIGIN,
    credentials: true,
  })
);
app.use(
  session({
    secret: SESSION_SECRET,
    cookie: {
      secure: NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 10,
      httpOnly: true,
      domain: NODE_ENV === "production" ? FE_ORIGIN : undefined,
      path: "/",
      sameSite: NODE_ENV === "production",
    },
    resave: false,
    saveUninitialized: false,
    store: new SessionStore({
      tableName: "ServerSession",
      createTableIfMissing: false,
      conString: DATABASE_URL,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/summary", loggedInGuard, summaryRouter);
app.use("/tasks", loggedInGuard, taskRouter);

app.listen(4000, () => {
  console.log("Server listening on port 4000..");
});
