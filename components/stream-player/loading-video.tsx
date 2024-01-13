import { Loader } from "lucide-react";
import React from "react";

interface LoadingVideoProps {
  label: string;
}

const LoadingVideo = ({ label }: LoadingVideoProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
      <Loader className="w-10 h-10 text-muted-foreground animate-spin" />
      <p className="text-muted-foreground capitalize">{label}</p>
    </div>
  );
};

export default LoadingVideo;
