import { Link } from "@remix-run/react"


export default function Dashboard() {
    return (
        <>
            <h1>Dashboard</h1>
            <Link to={'/library/1'}>Library</Link>
        </>
    )
}
