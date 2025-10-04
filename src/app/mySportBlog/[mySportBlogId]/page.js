import {db} from "@/utils/db.Connection"
import Image from 'next/image';


export default async function MySportBlogDetailsPage({params}){

    const mySportBlogId =  (await params).mySportBlogId;

    const query = await db.query(
        `SELECT id, title, description, imagesrc FROM posts WHERE id = ${mySportBlogId}`)
        //console.log(query)

        const blogPost = query.rows[0]
        console.log(blogPost)

        //i need a filter logic. if the title is the same as the name of the image, show the path for that image OR use the path of the image in the source prop for the image component.   
    return(
        <>
            <h3>Name: {blogPost.title}</h3>
            <Image
            src= {blogPost.imagesrc}
            alt= {`Image of ${blogPost.title}`}
            width={100}
            height={500}

            />

            <p>Description: {blogPost.description}</p>

        </>
    )
}