"use client";

import React from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Trash } from "lucide-react";
import { useOrgId } from "@/hooks/useOrgId";
import { Button } from "./ui/button";

const FilesList = () => {
  const deleteFile = useMutation(api.files.deleteFile);
  const orgId = useOrgId();

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");

  return (
    <ul className="py-6 space-y-2">
      {files?.map((file) => (
        <div key={file._id} className="flex items-center gap-2">
          <p>{file.name}</p>
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
  );
};

export default FilesList;
