import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="h-full flex flex-1  flex-col items-center justify-center space-y-4 text-muted-foreground">
      <h1 className="text-2xl">404</h1>
      <p className="text-lg md:text-xl">
        We could&apos;t find the page that you were looking for.
      </p>
      <Link href="/" className={buttonVariants({ variant: "secondary" })}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
