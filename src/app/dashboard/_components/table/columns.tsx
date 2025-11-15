"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import { formatRelative } from "date-fns";
import UserAvatar from "../user-avatar";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import FileCardActions from "../file-card-actions";

function UserCell({ userId }: { userId: Id<"users"> }) {
  const data = useQuery(api.users.getUserProfile, {
    userId
  });

  const user = {
    name: data?.name,
    image: data?.image
  };

  return <UserAvatar user={user} />;
}

export const columns: ColumnDef<Doc<"files"> & { isFavorited: boolean }>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "type",
    header: "Type"
  },
  {
    header: "User",
    cell: ({ row }) => {
      return <UserCell userId={row.original.userId} />;
    }
  },
  {
    header: "Uploaded On",
    cell: ({ row }) => {
      return <p className="font-medium">{formatRelative(new Date(row.original._creationTime), new Date())}</p>;
    }
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return <FileCardActions file={row.original} />;
    }
  }
];
