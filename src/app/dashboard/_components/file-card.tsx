import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FileCardActions, { getFileUrl } from "./file-card-actions";
import { FileTextIcon, GanttChartIcon, ImageIcon } from "lucide-react";
import { ReactNode } from "react";
import Image from "next/image";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import FileUserInfo from "./file-user-info";

const FileCard = ({ file, favorites }: { file: Doc<"files">; favorites: Doc<"favorites">[] }) => {
  const typeIcons = {
    image: <ImageIcon className="size-full" />,
    pdf: <FileTextIcon className="size-full" />,
    csv: <GanttChartIcon className="size-full" />
  } as Record<Doc<"files">["type"], ReactNode>;

  const isFavorited = favorites.some((favorite) => favorite.fileId === file._id);

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2">
          <div className="size-6">{typeIcons[file.type]}</div>
          <span>{file.name}</span>
        </CardTitle>
        <div className="absolute top-0 right-2">
          <FileCardActions file={file} isFavorited={isFavorited} />
        </div>
      </CardHeader>
      <CardContent className="relative h-30 flex justify-center items-center">
        {file.type === "image" && (
          <Image alt={file.name} fill className="object-contain" src={getFileUrl(file.fileId)} />
        )}
        {file.type === "csv" && <GanttChartIcon className="size-20" />}
        {file.type === "pdf" && <FileTextIcon className="size-20" />}
      </CardContent>
      <CardFooter className="flex items-center justify-between text-xs">
        <FileUserInfo file={file} />
      </CardFooter>
    </Card>
  );
};

export default FileCard;
