import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserType {
  user: {
    name: string | undefined;
    image: string | undefined;
  };
}

const UserAvatar = ({ user }: UserType) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-8 shrink-0">
        <AvatarImage src={user.image} />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>

      <p className="font-medium">{user.name}</p>
    </div>
  );
};

export default UserAvatar;
