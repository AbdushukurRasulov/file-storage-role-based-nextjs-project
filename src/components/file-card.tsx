import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";
import FileCardActions from "./file-card-actions";
import { FileTextIcon, GanttChartIcon, ImageIcon } from "lucide-react";
import { ReactNode } from "react";
import Image from "next/image";

function getFileUrl(fileId: Id<"_storage">): string {
  const convexSiteUrl = process.env.NEXT_PUBLIC_CONVEX_SITE_URL;
  const getImageUrl = new URL(`${convexSiteUrl}/getImage`);
  getImageUrl.searchParams.set("storageId", fileId);

  return getImageUrl.href;
}

const FileCard = ({ file }: { file: Doc<"files"> }) => {
  const typeIcons = {
    image: <ImageIcon className="size-full" />,
    pdf: <FileTextIcon className="size-full" />,
    csv: <GanttChartIcon className="size-full" />
  } as Record<Doc<"files">["type"], ReactNode>;

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2">
          <div className="size-6">{typeIcons[file.type]}</div>
          <span>{file.name}</span>
          <div className="absolute top-0 right-2">
            <FileCardActions file={file} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-20 flex justify-center items-center">
        {file.type === "image" && <Image alt={file.name} width="200" height="100" src={getFileUrl(file.fileId)} />}
        {file.type === "csv" && <GanttChartIcon className="size-20" />}
        {file.type === "pdf" && <FileTextIcon className="size-20" />}
      </CardContent>
      <CardFooter className="">
        <Button
          className="w-full"
          onClick={() => {
            window.open(getFileUrl(file.fileId), "_blank");
          }}>
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
