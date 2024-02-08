import type {ActionFunctionArgs, LoaderFunctionArgs,} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { getSession, commitSession } from "../sessions";
import { loginUser } from "~/models/user.server";

export async function loader({request,}: LoaderFunctionArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );

    if (session.has("userId")) {
        let userId = session.get("userId");
        if (userId != undefined){
            return redirect("/dashboard/".concat(userId));
        }
    }

    const data = { error: session.get("error") };

    return json(data, {
        headers: {
        "Set-Cookie": await commitSession(session),
        },
    });
}

export async function action({request,}: ActionFunctionArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const form = await request.formData();
    const email = form.get("email");
    const password = form.get("password");

    let userId = null;
    let user;

    if (email != null && password != null) {
        user = await loginUser(email.toString(), password.toString());   
        
        if (user != null) {
            userId = user.id;
        }
    }

    if (userId == null) {
        session.flash("error", "Invalid username/password");

        // Redirect back to the login page with errors.
        return redirect("/login", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
        });
    }

    session.set("userId", userId);

    // Login succeeded, send them to the home page.
    return redirect("/dashboard/".concat(userId), {
        headers: {
        "Set-Cookie": await commitSession(session),
        },
    });
}

export default function Login() {
    const { error } = useLoaderData<typeof loader>();

    return (
        <div>
        {error ? <div className="error">{error}</div> : null}
        <Form method="post" action="/login">
            <div>
            <p>Please sign in</p>
            </div>
            <label>
            Email: <input type="email" name="email" />
            </label>
            <label>
            Password:{" "}
            <input type="password" name="password" />
            </label>
            <button type="submit">Login</button>
        </Form>
        </div>
    );
}
