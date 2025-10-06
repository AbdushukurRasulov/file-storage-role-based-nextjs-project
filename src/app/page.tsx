"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Trash } from "lucide-react";

export default function Home() {
  const createFile = useMutation(api.files.createFile);
  const deleteFile = useMutation(api.files.deleteFile);
  const files = useQuery(api.files.getFiles);

  return (
    <>
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <main className="max-w-7xl mx-auto">
        <Button
          onClick={() => {
            createFile({
              name: "Hello World"
            });
          }}>
          Click Me
        </Button>

        <ul className="py-6 space-y-2">
          {files?.map((file) => (
            <div key={file._id} className="flex items-center gap-2">
              <p>
                {file.name} - {file._id}
              </p>
              <Button
                onClick={() => {
                  deleteFile({ fileId: file._id });
                }}
                variant={"destructive"}>
                <Trash className="size-4" />
              </Button>
            </div>
          ))}
        </ul>
      </main>
    </>
  );
}
