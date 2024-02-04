import { Link } from "@remix-run/react"

export default function Register() {
    return (
        <>
            <h1>Register</h1>
            <Link to={'/dashboard/1'}>Dashboard</Link>
        </>
    )
}
