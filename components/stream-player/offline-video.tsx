import { WifiOff } from "lucide-react";
import React from "react";

interface OfflineVideoProps {
  username: string;
}

const OfflineVideo = ({ username }: OfflineVideoProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
      <WifiOff className="w-10 h-10 text-muted-foreground" />
      <p className="text-muted-foreground">{username}&apos;s is offline</p>
    </div>
  );
};

export default OfflineVideo;
