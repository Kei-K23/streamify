import { UserButton } from "@clerk/nextjs";
import Result from "./_components/result";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="h-full max-w-screen-2xl mx-auto p-8">
      <Suspense fallback={<Result.Skeleton />}>
        <Result />
      </Suspense>
    </main>
  );
}
