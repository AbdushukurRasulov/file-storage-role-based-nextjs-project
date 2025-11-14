"use client";
import React from "react";
import FileBrowser from "../_components/files-browser";
// import { useQuery } from "convex/react";
// import { api } from "../../../../convex/_generated/api";

const FavoritesPage = () => {
  // const files = useQuery(api.files.getFiles, {
  //   orgId
  // });
  return (
    <>
      <FileBrowser title="Your favorites" favorites />
    </>
  );
};

export default FavoritesPage;
