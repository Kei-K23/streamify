"use client";

import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { Copy, CopyCheckIcon, CopyIcon } from "lucide-react";
import React, { useState } from "react";

interface CopyBtnProps {
  value?: string | null;
}

const CopyBtn = ({ value }: CopyBtnProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const ICON = isCopied ? CopyCheckIcon : CopyIcon;

  function onCopy() {
    if (value) {
      setIsCopied(true);
      navigator.clipboard.writeText(value);

      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } else {
      return;
    }
  }

  return (
    <ActionTooltip title={isCopied ? "Copied" : "Copy"}>
      <Button
        onClick={onCopy}
        disabled={isCopied}
        size={"sm"}
        variant={"ghost"}
      >
        <ICON />
      </Button>
    </ActionTooltip>
  );
};

export default CopyBtn;
