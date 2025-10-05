
import {db} from "@/utils/db.Connection"
import Image from 'next/image';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import sportBlogStyles from "../mySportBlog.module.css";



export default async function MySportBlogDetailsPage({params}){

    const mySportBlogId =  (await params).mySportBlogId;

    const query = await db.query(
        `SELECT id, title, description, imagesrc FROM posts WHERE id = ${mySportBlogId}`)

        const blogPost = query.rows[0];

        const query1 = await db.query(
        `SELECT id, name, comment, post_id FROM comments WHERE post_id = ${mySportBlogId}`)

        const commentDetails = query1.rows

        console.log(query1.rows)

        async function HandleSubmit(formData){
            "use server"

            const formValues = {
                name : formData.get("name"),
                comment: formData.get("comment")
            }

             db.query(
            `INSERT INTO comments (name, comment, post_id) VALUES($1, $2, $3)`,
             [formValues.name, formValues.comment, mySportBlogId ]
            );

            //refresh the cache
            revalidatePath(`/mySportBlog/${mySportBlogId}`);

            //redirect the user to the mySportBlogID page
            redirect(`/mySportBlog/${mySportBlogId}`);



        }
        // async function handleDelete ({commentId}){
        //     "use client"
        //     console.log(commentId)
        // }

         
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

            <form className={sportBlogStyles.formStyle} action={HandleSubmit}>
                <fieldset>
                    <legend>What&apos;s your say</legend>
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required /> <br></br>
                    <label htmlFor="comment" name="comment" >Comments: </label>
                    <input type="text" name="comment" required/>
                </fieldset>
                <button type="submit">submit</button>


            </form>

            <div className={sportBlogStyles.commentSection}>
                {commentDetails.map((commentdetail)=>{
                    return(
                        <div className={sportBlogStyles.commentCon} key={commentdetail.id}>
                            <div className={sportBlogStyles.comment}>
                                 {commentdetail.comment}
                            </div>

                            <div className={sportBlogStyles.commentName}>
                                 {commentdetail.name}
                            </div>
                           
                            {/* <button type="button" onClick={()=>handleDelete("commentdetail.id")}>DEL</button> */}

                            {/* <button onClick={() => console.log('Button clicked!')}>Click me!</button> */}

                        </div>
                    )
                })}
            </div>

        </>
    )
}