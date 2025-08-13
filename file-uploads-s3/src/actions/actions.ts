
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

// checksum used to check if the file arrived in the same state as sent by the client
export async function getSignedURLAction(fileName: string, fileType: string, size: number,checksum:string) {
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
        Key: fileName.toLowerCase().split(" ").join("-"),   // it is the file name as it appears in s3 and must be unique
        ContentLength:size,
        ContentType:fileType,
        ChecksumSHA256:checksum,
        Metadata:{ // useful if we want to accosiate some data with file stored in s3 later on
            // userId : sessionStorage.user.id  // now we will know which user uploaded the particular file in s3
        }
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
