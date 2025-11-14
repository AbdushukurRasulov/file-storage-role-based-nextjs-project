import Image from "next/image";
import React from "react";
import { UploadFileButton } from "./upload-file-button";

const Placeholder = () => {
  return (
    <div className="max-w-lg mx-auto text-center space-y-10 py-40">
      <div className="relative max-w-md h-50">
        <Image src={"/empty.svg"} alt="Empty" fill className="object-contain" />
      </div>
      <p className="text-lg font-medium ">You Have no files, go ahead and upload one now</p>
      <UploadFileButton />
    </div>
  );
};

export default Placeholder;
