import {db} from "@/utils/db.Connection"
import Link from "next/link"


export default async function MySportBlogPage(){

    const query = await db.query(
        `SELECT id, title, description, imagesrc FROM posts`);

        console.log(query);
        const blogPosts = query.rows;
    return(
        <>

            {/* <h1>My Blog Page</h1> */}

            <div>

                {
                    blogPosts.map((blogPost)=>{
                        return (
                            <div key={blogPost.id}>
                                <Link href={`/mySportBlog/${blogPost.id}`}>
                                {blogPost.title}

                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}