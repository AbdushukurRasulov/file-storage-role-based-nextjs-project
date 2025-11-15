import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelative, subDays } from "date-fns";

const FileUserInfo = ({ file }: { file: Doc<"files"> }) => {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId
  });
  return (
    <>
      <div className="flex items-center gap-2">
        <Avatar className="size-8 shrink-0">
          <AvatarImage src={userProfile?.image} />
          <AvatarFallback>{userProfile?.name}</AvatarFallback>
        </Avatar>

        <p className="font-medium">{userProfile?.name}</p>
      </div>

      <p className="text-gray-500">Updated at {formatRelative(new Date(file._creationTime), new Date())}</p>
    </>
  );
};

export default FileUserInfo;
