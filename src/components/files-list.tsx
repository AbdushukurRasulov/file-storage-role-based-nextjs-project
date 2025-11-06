"use client";

import React from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Trash } from "lucide-react";
import { useOrgId } from "@/hooks/useOrgId";
import { Button } from "./ui/button";
import FileCard from "./file-card";

const FilesList = () => {
  const deleteFile = useMutation(api.files.deleteFile);
  const orgId = useOrgId();

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");

  return (
    <div className="grid grid-cols-4 gap-5 py-10">
      {files?.map((file) => (
        <FileCard key={file._id} file={file}></FileCard>
      ))}
    </div>
  );
};

export default FilesList;
