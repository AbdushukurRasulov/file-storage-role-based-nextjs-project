"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { MoreVertical, StarIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Protect } from "@clerk/nextjs";

const FileCardActions = ({ file, isFavorited }: { file: Doc<"files">; isFavorited: boolean }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const deleteFile = useMutation(api.files.deleteFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteFile({ fileId: file._id });
              }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => toggleFavorite({ fileId: file._id })}
            className="flex items-center gap-1  cursor-pointer">
            {!isFavorited ? (
              <div className="flex items-center gap-2">
                <StarIcon className="size-4 shrink-0 " />
                Favorite
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <StarIcon className="size-4 shrink-0 text-yellow-500 fill-yellow-500" />
                Unfavorite
              </div>
            )}
          </DropdownMenuItem>
          <hr />
          <Protect role="org:admin" fallback={<></>}>
            <DropdownMenuItem
              onClick={() => setIsConfirmOpen(true)}
              className="flex items-center gap-1 text-red-600 cursor-pointer">
              <TrashIcon className="size-4 shrink-0 text-red-600" />
              Delete
            </DropdownMenuItem>
          </Protect>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default FileCardActions;
