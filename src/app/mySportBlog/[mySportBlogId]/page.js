import {db} from "@/utils/db.Connection"

export default async function MySportBlogDetailsPage({params}){

    const mySportBlogId =  (await params).mySportBlogId;

    const query = await db.query(
        `SELECT id, title, description FROM posts WHERE id = ${mySportBlogId}`)
        //console.log(query)

        const blogPost = query.rows[0]
        console.log(blogPost)
    return(
        <>
            <h3>Name: {blogPost.title}</h3>
            <p>Description: {blogPost.description}</p>
        </>
    )
}