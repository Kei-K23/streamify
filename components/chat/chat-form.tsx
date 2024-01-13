import React, { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import ChatInfo from "./chat-info";

interface ChatFormProps {
  onSubmit: () => void;
  onChange: (value: string) => void;
  value: string;
  isHidden: boolean;
  isChatEnable: boolean;
  isFollowing: boolean;
  isChatFollowerOnly: boolean;
  isDelayChat: boolean;
}

const ChatForm = ({
  onChange,
  onSubmit,
  value,
  isChatEnable,
  isChatFollowerOnly,
  isDelayChat,
  isFollowing,
  isHidden,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);
  const isFollowerOnlyAndIsNotFollow = isChatFollowerOnly && !isFollowing;
  const isDisable = isHidden || isDelayBlocked || isFollowerOnlyAndIsNotFollow;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisable) return;

    if (isDelayChat && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  }

  if (isHidden) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-2 p-3"
    >
      <div className="w-full">
        <ChatInfo
          isDelayChat={isDelayChat}
          isChatFollowerOnly={isChatFollowerOnly}
        />
        <Input
          disabled={isDisable}
          placeholder="Send a message"
          className={cn(
            "border-zinc-300",
            isChatFollowerOnly && "border-t-none border-t-0"
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="ml-auto">
        <Button disabled={isDisable} variant={"primary"} size={"sm"}>
          Chat
        </Button>
      </div>
    </form>
  );
};

ChatForm.Skeleton = function ChatFormSkeleton() {
  return (
    <div className="flex flex-col items-center gap-y-2 p-3">
      <div className="w-full">
        <Skeleton className="w-full h-10" />
      </div>
      <div className="ml-auto">
        <Skeleton className="w-7 h-7" />
      </div>
    </div>
  );
};

export default ChatForm;
