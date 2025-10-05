
import {db} from "@/utils/db.Connection"
import Link from "next/link"
import sportBlogStyles from "./mySportBlog.module.css";


export default async function MySportBlogPage({params}){
    // const sortOrder = await searchParams.sortBy ||"asc"
    const sortOrder =  (await params);

    const query = await db.query(
        `SELECT id, title, description, imagesrc FROM posts`);
        

        const blogPosts = query.rows;

        //const wrangledData = query.title

        // blogPosts.sort((a, b) => b.title.localeCompare(a.title));
        // console.log(blogPosts)

//   return {blogPosts}

        if(sortOrder === "asc"){
            blogPosts.sort((a,b)=>{
                return a.title.localeCompare(b.title);
            })
        }
        else if (sortOrder === "desc"){
            blogPosts.sort((a,b)=>{
                return b.title.localeCompare(a.title)
            })
        }
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