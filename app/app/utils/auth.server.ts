import { Authenticator, AuthorizationError } from "remix-auth";
import {
  getSession,
  commitSession,
  destroySession,
} from "~/utils/sessions.server";
import { User } from "@prisma/client";
import { FormStrategy } from "remix-auth-form";

import { createUser, loginUser, updatePassword } from "~/models/user.server";
import {
  createCritter,
  assignCritterToUser,
  getRandomCritter,
  hatchCritter,
} from "~/models/critter.server";

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

    let user: User | null = null;
    // fetch the user from the database

    try {
      // the type of this user must match the type you pass to the Authenticator
      // the strategy will automatically inherit the type if you instantiate
      // directly inside the `use` method
      user = await loginUser(email.toString(), password.toString());
    } catch (e) {
      throw new AuthorizationError("Error logging in. Please try again.");
    }

    if (user === null) {
      throw new AuthorizationError("Incorrect email/password");
    }

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
    return await createUser(
      username.toString(),
      email.toString(),
      password.toString(),
    ).then((user) => {
      if (user instanceof Error) {
        throw new AuthorizationError("User already exists");
      }

      if (
        user === null ||
        user === undefined ||
        Object.keys(user).length === 0
      ) {
        throw new AuthorizationError("Error creating user");
      }

      if (user) {
        const critter = hatchCritter(user.id);
        console.log(critter);
      }

      // the type of this user must match the type you pass to the Authenticator
      // the strategy will automatically inherit the type if you instantiate
      // directly inside the `use` method
      return user;
    });
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "register",
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const oldPassword = form.get("oldPassword");
    const newPassword = form.get("newPassword");
    const confirmNewPassword = form.get("confirmNewPassword");

    if (!email) throw new AuthorizationError("Email is required");

    if (!oldPassword) throw new AuthorizationError("Old password is required");

    if (!newPassword) throw new AuthorizationError("New password is required");

    if (!confirmNewPassword)
      throw new AuthorizationError("Confirm new password is required");

    if (
      typeof email !== "string" ||
      typeof oldPassword !== "string" ||
      typeof newPassword !== "string" ||
      typeof confirmNewPassword !== "string"
    )
      throw new AuthorizationError("Invalid email/password");

    if (!email.includes("@")) throw new AuthorizationError("Invalid email");

    if (newPassword !== confirmNewPassword)
      throw new AuthorizationError("Passwords do not match");

    // fetch the user from the database
    const user = await loginUser(email.toString(), oldPassword.toString());

    if (user instanceof Error)
      throw new AuthorizationError("Incorrect email/password");

    // update the user's password
    if (user) {
      await updatePassword(user.id, newPassword.toString());
    }

    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  "change-password",
);
