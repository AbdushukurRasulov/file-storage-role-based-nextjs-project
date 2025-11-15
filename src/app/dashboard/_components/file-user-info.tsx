import { useQuery } from "convex/react";
import React from "react";
import { api } from "@convex/_generated/api";
import { Doc } from "@convex/_generated/dataModel";
import { formatRelative } from "date-fns";
import UserAvatar from "./user-avatar";

const FileUserInfo = ({ file }: { file: Doc<"files"> }) => {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId
  });

  const user = {
    name: userProfile?.name,
    image: userProfile?.image
  };

  return (
    <>
      <UserAvatar user={user} />

      <p className="text-gray-500">Updated at {formatRelative(new Date(file._creationTime), new Date())}</p>
    </>
  );
};

export default FileUserInfo;
