"use client";
import React from "react";
import FileBrowser from "../_components/files-browser";

const TrashPage = () => {
  return (
    <>
      <FileBrowser title="Your Trashes" deletedOnly />
    </>
  );
};

export default TrashPage;
