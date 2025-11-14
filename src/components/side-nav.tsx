"use client";
import React from "react";
import Link from "next/link";
import { FileIcon, StarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const SideNav = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-5 w-40 shrink-0">
      <Link href="/dashboard/files">
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "text-gray-900 font-medium": pathname.includes("/dashboard/files"),
            "text-gray-500": !pathname.includes("/dashboard/files")
          })}>
          <FileIcon /> All Files
        </Button>
      </Link>
      <Link href="/dashboard/favorites">
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "text-gray-900 font-medium": pathname.includes("/dashboard/favorites"),
            "text-gray-500": !pathname.includes("/dashboard/favorites")
          })}>
          <StarIcon /> Favorites
        </Button>
      </Link>
    </div>
  );
};

export default SideNav;
