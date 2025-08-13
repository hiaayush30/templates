"use server"

import { revalidatePath } from "next/cache"

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function deletePost(postId: number) {
  try {
    // delete media table entry where postId matche
    const deletedMedia = await prisma.media.delete({where:{postId}})
    // delete post table entry where id = postId

    if (deletedMedia) { // only if the post had media
      const url = deletedMedia.url
      const key = url.split("/").slice(-1)[0]  
     // This line takes the last part of the URL (after the final /) and stores it in key.

      const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
      }

      await s3Client.send(new DeleteObjectCommand(deleteParams))
    }

    revalidatePath("/")
  } catch (e) {
    console.error(e)
  }
}