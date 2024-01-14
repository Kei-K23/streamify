import { Pen } from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import InfoModal from "./info-modal";

interface InfoCardProps {
  streamName: string;
  hostIdentity: string;
  viewerIdentity: string;
  thumbnailImg?: string | null;
}

const InfoCard = ({
  streamName,
  hostIdentity,
  viewerIdentity,
  thumbnailImg,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="bg-zinc-800 p-4 rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-start gap-x-3">
            <div className="rounded-md bg-yellow-400 text-black p-2">
              <Pen className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-base font-bold mb-1">
                Edit your stream info
              </h2>
              <p className="text-xs md:text-base text-muted-foreground">
                You can edit your stream information at every time.
              </p>
            </div>
          </div>
          <InfoModal
            initialStreamName={streamName}
            initialThumbnailImg={thumbnailImg}
          />
        </div>
        <Separator className="w-full h-[1.8px] my-4" />
        <div className="space-y-4">
          <div>
            <h2 className="text-muted-foreground mb-1">Name</h2>
            <h2>{streamName}</h2>
          </div>
          <div className="space-y-4">
            <h2 className="text-muted-foreground mb-1">Thumbnail</h2>
            {thumbnailImg && (
              <div className="aspect-video border relative rounded-md w-[150px]  md:w-[220px] h-[150px] md:h-[200px]">
                <Image
                  src={thumbnailImg}
                  alt="thumbnail"
                  fill
                  className="rounded-md object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
