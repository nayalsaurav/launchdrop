import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, Response } from "express";

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: typeof auth.$Infer.Session.user;
    }
  }
}

export async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });
    if (!session || !session.user) {
        return res.status(401).json({ error: "Unauthorized user" });
    }
    req.user = session.user;
    next();
}