import { Maximize, Minimize } from "lucide-react";
import React from "react";
import ActionTooltip from "../action-tooltip";

interface FullscreenControl {
  isFullscreen: boolean;
  onToggle: () => void;
}

const FullscreenControl = ({ isFullscreen, onToggle }: FullscreenControl) => {
  const Icon = isFullscreen ? Minimize : Maximize;
  const label = isFullscreen ? "Exit full screen" : "Enter full screen";

  return (
    <div>
      <ActionTooltip title={label}>
        <button onClick={onToggle}>
          <Icon className="w-5 h-5" />
        </button>
      </ActionTooltip>
    </div>
  );
};

export default FullscreenControl;
