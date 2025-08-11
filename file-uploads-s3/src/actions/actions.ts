
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

export async function getSignedURLAction(fileName:string) {
    //  const session = await auth();
    //  if(!session) return {failure:"Not authenticated"}

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileName.toLowerCase().split(" ").join("-")   // it is the file name as it appears in s3
    })

    const signedURL = await getSignedUrl(s3, putObjectCommand, {
        expiresIn: 60  //seconds
    })

    return {
        success: {
            url: signedURL
        }
    }
}


// This code is a server action in Next.js that generates a pre-signed S3 URL so your client (browser)
// can upload a file directly to Amazon S3 without your server handling the file bytes.

// my client app has 60 seconds to upload the file using this url before it expires
