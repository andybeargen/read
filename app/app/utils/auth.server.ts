import { Authenticator, AuthorizationError } from "remix-auth";
import {
  getSession,
  commitSession,
  destroySession,
} from "~/utils/sessions.server";
import { User } from "@prisma/client";
import { FormStrategy } from "remix-auth-form";
import { createUser, loginUser } from "~/models/user.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User | Error | null>(
  {
    getSession,
    commitSession,
    destroySession,
  },
  {
    sessionKey: "userId",
    sessionErrorKey: "error",
  },
);

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    if (!email) throw new AuthorizationError("Email is required");

    if (!password) throw new AuthorizationError("Password is required");

    if (typeof email !== "string" || typeof password !== "string")
      throw new AuthorizationError("Invalid email/password");

    if (!email.includes("@")) throw new AuthorizationError("Invalid email");

    // fetch the user from the database
    const user = await loginUser(email.toString(), password.toString());

    if (user instanceof Error)
      throw new AuthorizationError("Incorrect email/password");

    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "email-pass",
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");
    const username = form.get("username");

    if (!email) throw new AuthorizationError("Email is required");

    if (!password) throw new AuthorizationError("Password is required");

    if (!username) throw new AuthorizationError("Username is required");

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof username !== "string"
    )
      throw new AuthorizationError("Invalid email/password/username");

    if (!email.includes("@")) throw new AuthorizationError("Invalid email");

    // fetch the user from the database
    const user = await createUser(
      username.toString(),
      email.toString(),
      password.toString(),
    );

    if (user instanceof Error)
      throw new AuthorizationError("User already exists");

    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "register",
);
