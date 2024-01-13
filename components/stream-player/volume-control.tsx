"use client";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import React from "react";
import ActionTooltip from "../action-tooltip";
import { Slider } from "../ui/slider";

interface VolumeControlProps {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
}

const VolumeControl = ({ onToggle, onChange, value }: VolumeControlProps) => {
  const isMuted = value === 0;
  const isHalf = value > 50;

  let Icon = Volume1;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isHalf) {
    Icon = Volume2;
  }
  const label = isMuted ? "Unmute" : "Mute";

  function handleOnChange(value: number[]) {
    onChange(value[0]);
  }

  return (
    <div className="flex items-center gap-2">
      <ActionTooltip title={label}>
        <button onClick={onToggle}>
          <Icon className="w-5 h-5" />
        </button>
      </ActionTooltip>
      <Slider
        className="w-[100px] cursor-pointer"
        value={[value]}
        onValueChange={handleOnChange}
        max={100}
        step={1}
      />
    </div>
  );
};

export default VolumeControl;
