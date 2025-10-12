import { UploadFileButton } from "@/components/upload-file-button";
import FilesList from "@/components/files-list";

export default function Home() {
  return (
    <>
      <div className="flex items-center space-x-10">
        <h2 className="text-3xl font-bold">You Files</h2>
        <UploadFileButton />
      </div>

      <FilesList />
    </>
  );
}
