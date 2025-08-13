"use client"
import { FilePlusIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import { ChangeEvent, FormEvent, useRef, useState } from "react"
import { createPost, getSignedURLAction } from "@/actions/create.actions"
import axios from "axios"

function Dashboard() {
  const [content, setContent] = useState("")
  const [file, setFile] = useState<undefined | File>(undefined)

  const [localFileURL, setLocalFileURL] = useState<string | undefined>(undefined)
  const fileInputRef = useRef<null | HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0]
    setFile(newFile)

    if (localFileURL) {
      URL.revokeObjectURL(localFileURL)
    }
    if (newFile) {
      const url = URL.createObjectURL(newFile)
      setLocalFileURL(url)
    } else {
      setLocalFileURL(undefined)
    }
  }


  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("")

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatusMessage("uploading")
    setLoading(true)
    console.log(content, file)
    try {
      if (file) {
        const checksum = await computeSHA256(file);
        const signedUrlResult = await getSignedURLAction(file.type, file.size, checksum)
        if (signedUrlResult.failure) {
          setStatusMessage("failed")
          setLoading(false)
        }

        if (!signedUrlResult.success) throw new Error(signedUrlResult.failure)
        const { url, mediaId } = signedUrlResult?.success

        await axios.put(url, file, {
          headers: {
            "Content-Type": file.type
          }
        })
        alert("file uploaded to S3")

        // assuming you are creating insta posts
        await createPost({content,mediaId});

        // send user back to updated feed
        // revalidatePath("/")
        // redirect("/")
      }
    } catch (error) {
      console.log(error)
      setStatusMessage("failed")
      alert("Upload failed")
    }
    finally {
      setLoading(false)
    }
  }



  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      {statusMessage && <div>{statusMessage}</div>}
      <div className="p-4 bg-red-300 rounded-md w-[50vw] min-h-30">
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5 justify-center bg-red-400 p-3">
          <div>
            <label className="mx-3">Content:</label>
            <input type="text" placeholder="Enter content" onChange={(e) => setContent(e.target.value)} className="outline-none" />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            name="media"
            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
            onChange={handleChange}
            className="hidden"
          />
          <FilePlusIcon
            onClick={() => fileInputRef.current?.click()}
            className="size-6 hover:scale-110 transition-all duration-200 cursor-pointer"
          />
          <button disabled={loading} className="p-1 bg-red-600 text-white rounded-md hover:bg-red-500 hover:scale-105 cursor-pointer" type="submit">Submit</button>
        </form>
        {localFileURL && file && (
          <div>
            {file.type.startsWith("image/") && (
              <div className="relative w-64 h-64">
                <Image alt={file.name} src={localFileURL} className="object-cover" fill />
              </div>
            )}
            {file.type.startsWith("video") && (
              <video controls src={localFileURL} className="w-64 h-64 object-cover" />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
