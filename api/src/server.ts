import PgStore from "connect-pg-simple";
import cors from "cors";
import express from "express";
import session from "express-session";
import { passport } from "./lib/auth";
import authRouter from "./routes/auth";
import summaryRouter from "./routes/summary";
import taskRouter from "./routes/task";
import {
  DATABASE_URL,
  NODE_ENV,
  SESSION_ORIGIN,
  SESSION_SECRET,
} from "./utils/env";

const SessionStore = PgStore(session);

const app = express();

app.use(express.json());
// app.use(pino());
app.use(cors({ origin: SESSION_ORIGIN, credentials: true }));
app.use(
  session({
    secret: SESSION_SECRET,
    cookie: {
      secure: NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 10,
      httpOnly: true,
      domain: NODE_ENV === "production" ? SESSION_ORIGIN : undefined,
      path: "/",
      sameSite: NODE_ENV === "production",
    },
    resave: false,
    saveUninitialized: false,
    store: new SessionStore({
      tableName: "ServerSession",
      createTableIfMissing: true,
      conString: DATABASE_URL,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/summary", summaryRouter);
app.use("/tasks", taskRouter);

app.listen(4000);
