import React, {
  ElementRef,
  FormEvent,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { updateStream } from "@/actions/stream-action";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ActionTooltip from "../action-tooltip";
import { Trash2Icon } from "lucide-react";

interface InfoModalProps {
  initialStreamName: string;
  initialThumbnailImg?: string | null;
}

const InfoModal = ({
  initialStreamName,
  initialThumbnailImg,
}: InfoModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [streamName, setStreamName] = useState(initialStreamName);
  const [thumbnailImg, setThumbnailImg] = useState(initialThumbnailImg);

  function onRemoveThumbnail() {
    startTransition(() => {
      updateStream({ thumbnailImg: null })
        .then((data) => {
          toast.success(`Thumbnail image have removed`);
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name: streamName })
        .then((data) => {
          toast.success(`Successfully updated ${data.name}`);
          setThumbnailImg("");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your stream Info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-3">
            <Label>Name</Label>
            <Input
              placeholder="Stream name"
              value={streamName}
              onChange={(e) => setStreamName(e.target.value)}
              disabled={isPending}
            />
          </div>
          <div className="space-y-3">
            <Label>Thumbnail</Label>
            {thumbnailImg ? (
              <div className="aspect-video relative rounded-md border">
                <Image
                  fill
                  src={thumbnailImg}
                  alt="thumbnail"
                  className="object-fit"
                />
                <div className="absolute top-0 right-0">
                  <ActionTooltip title="Remove Thumbnail">
                    <Button
                      variant={"destructive"}
                      size={"sm"}
                      onClick={onRemoveThumbnail}
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </ActionTooltip>
                </div>
              </div>
            ) : (
              <div className="border rounded-md">
                <UploadDropzone
                  endpoint="thumbnailImgUploader"
                  appearance={{
                    label: {
                      color: "#ffffff",
                    },
                    allowedContent: {
                      color: "#ffffff",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailImg(res?.[0]?.url);
                    closeRef?.current?.click();
                    router.refresh();
                  }}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild ref={closeRef}>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>
            <Button type="submit" variant={"primary"} disabled={isPending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
