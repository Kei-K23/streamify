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
import { toast } from "sonner";
import { updateUser } from "@/actions/user-action";
import { Textarea } from "../ui/textarea";

interface AboutModalProps {
  initialBio?: string | null;
}

const AboutModal = ({ initialBio }: AboutModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [bio, setBio] = useState(initialBio);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(() => {
      updateUser({ bio })
        .then((data) => {
          toast.success(`Successfully ${data.username}'s Bio`);
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
          <DialogTitle>Edit User Bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-3">
            <Label>Bio</Label>
            <Textarea
              placeholder="Your Bio"
              value={bio!}
              onChange={(e) => setBio(e.target.value)}
              disabled={isPending}
            />
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

export default AboutModal;
