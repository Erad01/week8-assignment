import {db} from "@/utils/db.Connection"
import Image from 'next/image';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export default async function MySportBlogDetailsPage({params}){

    const mySportBlogId =  (await params).mySportBlogId;

    const query = await db.query(
        `SELECT id, title, description, imagesrc FROM posts WHERE id = ${mySportBlogId}`)
        //console.log(query)

        const blogPost = query.rows[0];

        async function HandleSubmit(formData){
            "use server"

            const formValues = {
                name : formData.get("name"),
                comment: formData.get("comment")
            }

             db.query(
            `INSERT INTO comments (name, comment) VALUES($1, $2) WHERE post_id = ${mySportBlogId}`,
             [formValues.name, formValues.comment]
            );


            //refresh the cache
            revalidatePath(`/mySportBlog/${mySportBlogId}`);

            //redirect the user to the mySportBlogID page
            redirect(`/mySportBlog/${mySportBlogId}`);



        }

         
    return(
        <>
            <h3 className="">{blogPost.title}</h3>
            <Image
            src= {blogPost.imagesrc}
            alt= {`Image of ${blogPost.title}`}
            width={500}
            height={500}
            />
            <p>{blogPost.description}</p>

            <form action={HandleSubmit}>
                <fieldset>
                    <legend>What&apos;s your say</legend>
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required /> <br></br>
                    <label htmlFor="comment" name="comment" >Comments: </label>
                    <input type="text" name="comment" required/>
                </fieldset>
                <button type="submit">submit</button>


            </form>

        </>
    )
}