"use client";
import React, { useState, useTransition } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { MailWarningIcon } from "lucide-react";
import { IngressInput } from "livekit-server-sdk";
import { createIngress } from "@/actions/ingress-action";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

const StreamConnectModal = () => {
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);
  const [isPending, startTransition] = useTransition();

  function onClick() {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => toast.success("Successfully created ingress"))
        .catch(() =>
          toast.error("Something went wrong when creating ingress!")
        );
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"primary"}>
          Generate Keys
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Keys</DialogTitle>
          <DialogDescription>
            Generate the key for your stream.
          </DialogDescription>
        </DialogHeader>
        <Select value={ingressType} onValueChange={(e) => setIngressType(e)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>

        <Alert>
          <MailWarningIcon className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            When regenerate the streaming key, all stream that uses old
            streaming key will stop.
          </AlertDescription>
        </Alert>
        <DialogFooter>
          <DialogClose asChild>
            <Button size={"sm"}>Cancel</Button>
          </DialogClose>
          <Button
            disabled={isPending}
            onClick={onClick}
            size={"sm"}
            variant={"primary"}
            className="mb-4 sm:mb-0"
          >
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StreamConnectModal;
