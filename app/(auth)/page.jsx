"use client";
import { UserButton } from "@clerk/nextjs";
import "@uploadthing/react/styles.css";

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { useState } from "react";
import Image from "next/image";
import { File } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [image, setimage] = useState("");

  const filetypepdf = image.split(".").pop();
  console.log(filetypepdf);

  if (image)
    return (
      <div className="">
        {filetypepdf === "png" ||
        filetypepdf === "jpg" ||
        filetypepdf === "jpeg" ? (
          <Image
            src={image}
            width={130}
            height={130}
            alt="image"
            className="object-cover"
          />
        ) : (
          <div>
            <File />
            <Link href={image} >
              {image}
            </Link>
          </div>
        )}
      </div>
    );

  return (
    <div>
      <UserButton afterSignOutUrl="/" />

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <UploadDropzone
          endpoint="messageFile"
          onClientUploadComplete={(res) => {
            setimage(res[0].url);
            console.log("Files: ", res[0].url);
            alert("Upload Completed");
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
        {/* <UploadButton
          endpoint="serverImage"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res[0].url);
            alert("Upload Completed");
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
        /> */}
      </main>
    </div>
  );
}
