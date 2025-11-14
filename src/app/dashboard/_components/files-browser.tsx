"use client";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { useOrgId } from "@/hooks/useOrgId";
import FileCard from "./file-card";

import { Loader2 } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import SearchBar from "./search-bar";
import Placeholder from "./placeholder";
import { UploadFileButton } from "@/app/dashboard/_components/upload-file-button";

const FileBrowser = ({ title }: { title: string }) => {
  const orgId = useOrgId();

  const [query, setQuery] = useState("");

  const files = useQuery(api.files.getFiles, orgId ? { orgId, query } : "skip");

  const isLoading = files === undefined;

  return (
    <>
      {isLoading && (
        <div className="flex flex-col w-full items-center mt-24">
          <Loader2 className="size-32 shrink-0 animate-spin text-gray-500" />
          <p className="text-2xl font-medium mt-4">Loading your images...</p>
        </div>
      )}

      {/* {!isLoading && !query && files.length === 0 && <Placeholder />} */}

      {!isLoading && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">{title}</h2>

            <SearchBar {...{ query, setQuery }} />

            <UploadFileButton />
          </div>

          {files.length === 0 ? (
            <Placeholder />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 py-10">
              {files?.map((file) => (
                <FileCard key={file._id} file={file}></FileCard>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FileBrowser;
