"use client";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { useOrgId } from "@/hooks/useOrgId";
import FileCard from "./file-card";

import { GridIcon, Loader2, RowsIcon } from "lucide-react";
import { api } from "@convex/_generated/api";
import SearchBar from "./search-bar";
import Placeholder from "./placeholder";
import { DataTable } from "./table/file-table";
import { columns } from "./table/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FileBrowser = ({
  title,
  favoritesOnly,
  deletedOnly
}: {
  title: string;
  favoritesOnly?: boolean;
  deletedOnly?: boolean;
}) => {
  const orgId = useOrgId();

  const [query, setQuery] = useState("");

  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId
      ? {
          orgId
        }
      : "skip"
  );

  const files = useQuery(api.files.getFiles, orgId ? { orgId, query, favorites: favoritesOnly, deletedOnly } : "skip");

  const modifiedFiles =
    files?.map((file) => ({
      ...file,
      isFavorited: (favorites ?? []).some((favorite) => favorite.fileId === file._id)
    })) ?? [];

  const isLoading = files === undefined;

  return (
    <>
      <Tabs defaultValue="grid">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">{title}</h2>

          <SearchBar {...{ query, setQuery }} />

          <TabsList className="h-11">
            <TabsTrigger value="grid">
              <GridIcon className="size-5 " />
            </TabsTrigger>
            <TabsTrigger value="table">
              <RowsIcon className="size-5" />
            </TabsTrigger>
          </TabsList>
        </div>

        {isLoading && (
          <div className="flex flex-col w-full items-center mt-24">
            <Loader2 className="size-32 shrink-0 animate-spin text-gray-500" />
            <p className="text-2xl font-medium mt-4">Loading your images...</p>
          </div>
        )}

        {!isLoading && (
          <>
            {files?.length === 0 ? (
              <Placeholder />
            ) : (
              <>
                <TabsContent value="grid">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 py-10">
                    {modifiedFiles?.map((file) => (
                      <FileCard key={file._id} file={file}></FileCard>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="table">
                  <DataTable columns={columns} data={modifiedFiles} />
                </TabsContent>
              </>
            )}
          </>
        )}
      </Tabs>
    </>
  );
};

export default FileBrowser;
