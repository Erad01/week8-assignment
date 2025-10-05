import {db} from "@/utils/db.Connection"
import Link from "next/link"
import sportBlogStyles from "./mySportBlog.module.css";


export default async function MySportBlogPage(){

    const query = await db.query(
        `SELECT id, title, description, imagesrc FROM posts`);


        const blogPosts = query.rows;

        //const wrangledData = query.title

        // if(query.title.sort === "asc"){
        //     blogPosts.title.sort((a,b)=>{
        //         return a.title.localeCompare(b.title);
        //     })
        // }
        // else if (query.title.sort === "desc"){
        //     blogPosts.title.sort((a,b)=>{
        //         return b.title.localeCompare(a.title)
        //     })
        // }
    return(
        <>

            {/* <h1>My Blog Page</h1> */}

            <div>

                {
                    blogPosts.map((blogPost)=>{
                        return (
                            <div className={sportBlogStyles.titleContainer} key={blogPost.id}>
                                <Link className={sportBlogStyles.link} href={`/mySportBlog/${blogPost.id}`}>
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