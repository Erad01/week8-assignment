import Link from "next/link"

export default function HeaderPage(){
    return(
        <>
        <nav>
            <Link href= "/">Home</Link>
            <Link href= "/aboutMe">About Me</Link>
            <Link href= "/mySportBlog">SportBlog</Link>
        </nav>
        </>
    )
}