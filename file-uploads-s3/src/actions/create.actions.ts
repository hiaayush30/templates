
"use server"

//this will return a URL which the client can use to send the file to s3

// import { auth } from "@/auth"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})

const acceptedTypes = [
    "image/jpeg", "iamge/png", "image/webp", "image/gif", "video/mp4", "video/webm"
]

const maxFileSIze = 1024 * 1024 * 10 // 10MB

import crypto from "crypto"   // will not work if its an edge fn
const generatedFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")

//for edge fn
// const generatedFileName = (bytes=32)=>{
//     const array = new Uint8Array(bytes)
//     crypto.getRandomValues(array)
//     return [...array].map(b=>b.toString(16).padStart(2,"0")).join("")
// }

// checksum used to check if the file arrived in the same state as sent by the client
export async function getSignedURLAction(fileType: string, size: number, checksum: string) {
    //  const session = await auth();
    //  if(!session) return {failure:"Not authenticated"}

    if (!acceptedTypes.includes(fileType)) {
        return { failure: "Invalid file type" }
    }
    if (size > maxFileSIze) {
        return { failure: "File can't be larger than 10MB" }
    }
    // but the client can still lie about above things so we embed it into signedURL

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: generatedFileName(),   // it is the file name as it appears in s3 and must be unique
        // and this name also appears in th epublic url of the file so i need it to be random there so people can't guess it
        ContentLength: size,
        ContentType: fileType,
        ChecksumSHA256: checksum,
        Metadata: { // useful if we want to accosiate some data with file stored in s3 later on
            // userId : sessionStorage.user.id  // now we will know which user uploaded the particular file in s3
        }
    })

    const signedURL = await getSignedUrl(s3, putObjectCommand, {
        expiresIn: 60  //seconds
    })

    // const mediaResult = await prisma.media.create({
    //   data:{
    // userId : sessionStorage.user.id,
    // type:fileType.startsWith("image") ? "image":"video"
    // url: signedURL.split("?")[0],
    //   }
    // })

    return {
        success: {
            url: signedURL,
            mediaId: "media id"     // mediaResult.id will be sent from here
        }
    }
}


// This code is a server action in Next.js that generates a pre-signed S3 URL so your client (browser)
// can upload a file directly to Amazon S3 without your server handling the file bytes.

// my client app has 60 seconds to upload the file using this url before it expires


// assuming you are creating insta posts
export async function createPost({ content, mediaId }: { content: string, mediaId?: string }) {
    // add the entry to post table
    // const session = await auth()
    // if(!session){ return {failure:"not authenticated"}}

    // if(mediaId){
// TODO : you can make a request to s3 to double check if the media is there

    // check if its the same user who uploaaded the media and the one who is creating the post with that media
    // const mediaItem = await prisma.media.findUnique({
    //     where:{
    //         id:mediaId
    //     }
    // })
    // if(mediaItem.userId !== session.user.id){
    //     return { failure:"something went very wrong!" }
    // }
    //}

    // const post = await prisma.post.create({
    //     userId:session.user.id,
    //     content
    // })

    // await prisma.media.update({
    //     where:{
    //         id:mediaId
    //     },
    //     data:{
    //         postId:post.id
    //     }
    // })
}