import { createUploadthing } from "uploadthing/next";
import { auth } from "@clerk/nextjs";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();

  if (!userId) {
    console.log("no user");
  }

  return {
    userId: userId,
  };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(file.url);
    }),

  messageFile: f(["image", "pdf",'text'])
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(file.url);
    }),
};
