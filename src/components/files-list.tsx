"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useOrgId } from "@/hooks/useOrgId";
import FileCard from "./file-card";
import Image from "next/image";
import { UploadFileButton } from "./upload-file-button";
import { Loader2 } from "lucide-react";

const FilesList = () => {
  const orgId = useOrgId();

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");

  return (
    <>
      {files === undefined && (
        <div className="flex flex-col w-full items-center mt-24">
          <Loader2 className="size-32 shrink-0 animate-spin text-gray-500" />
          <p className="text-2xl font-medium mt-4">Loading your images...</p>
        </div>
      )}

      {files && files.length === 0 && (
        <div className="max-w-lg mx-auto text-center space-y-10 py-40">
          <div className="relative max-w-md h-50">
            <Image src={"/empty.svg"} alt="Empty" fill className="object-contain" />
          </div>
          <p className="text-lg font-medium ">You Have no files, go ahead and upload one now</p>
          <UploadFileButton />
        </div>
      )}

      {files && files.length > 0 && (
        <>
          <div className="flex items-center space-x-10">
            <h2 className="text-3xl font-bold">You Files</h2>
            <UploadFileButton />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 py-10">
            {files?.map((file) => (
              <FileCard key={file._id} file={file}></FileCard>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default FilesList;
