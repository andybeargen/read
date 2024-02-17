import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      // TODO: set this as an environment variable
      secrets: [
        "i am a secret that is super secure and totally should not be an env var",
      ],
    },
  });

export { getSession, commitSession, destroySession };
