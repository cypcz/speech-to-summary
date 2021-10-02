declare module "@ffprobe-installer/ffprobe";

interface SessionUser {
  id: string;
  email: string;
  name: string;
}

declare namespace Express {
  interface Request {
    user?: SessionUser;
  }
}
