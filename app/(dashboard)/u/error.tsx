"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="h-full flex flex-1  flex-col items-center justify-center space-y-4 text-muted-foreground pt-14 md:pt-24">
      <h1 className="text-2xl text-rose-500">Error</h1>
      <p className="text-lg md:text-xl">Something went wrong!</p>
      <Link href="/" className={buttonVariants({ variant: "secondary" })}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
