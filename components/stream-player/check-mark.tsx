import { CheckIcon } from "lucide-react";
import React from "react";

const CheckMark = () => {
  return (
    <div className="p-0.5 bg-yellow-400 rounded-full text-black">
      <CheckIcon className="w-[12px] h-[12px] stroke-[4px]" />
    </div>
  );
};

export default CheckMark;
