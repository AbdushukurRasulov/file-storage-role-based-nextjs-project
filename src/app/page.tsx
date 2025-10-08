"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, useOrganization, UserButton, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Trash } from "lucide-react";

export default function Home() {
  const { isLoaded, organization } = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (isLoaded && user.isLoaded) {
    orgId = organization?.id ?? user.user?.id;
  }

  const createFile = useMutation(api.files.createFile);
  const deleteFile = useMutation(api.files.deleteFile);
  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");

  return (
    <>
      <Button
        onClick={() => {
          if (!orgId) return;
          createFile({
            name: "Hello World",
            orgId
          });
        }}>
        Click Me
      </Button>

      <ul className="py-6 space-y-2">
        {files?.map((file) => (
          <div key={file._id} className="flex items-center gap-2">
            <p>
              {file.name} - {file._id} - {file.orgId}
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
    </>
  );
}
