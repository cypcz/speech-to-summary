declare module "@ffprobe-installer/ffprobe";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: SessionUser;
    }
  }
}
