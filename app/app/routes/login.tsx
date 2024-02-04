import { Link } from "@remix-run/react"

export default function Login() {
    return (
        <>
            <h1>Login</h1>
            <Link to={'/dashboard/1'}>Dashboard</Link>
        </>
    )
}
