import Link from "next/link"

export default function HeaderPage(){
    return(
        <>
        <nav className="flex gap-y-2 p-2">
            <Link className="p-6" href= "/">Home</Link>
            <Link className="p-6" href= "/aboutMe">About Me</Link>
            <Link className="p-6" href= "/mySportBlog">SportBlog</Link>
        </nav>
        </>
    )
}