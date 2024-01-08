import { SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense
      fallback={
        <h2>
          <Loader2 className="w-10 h-10 animate-spin" />
        </h2>
      }
    >
      <SignUp />
    </Suspense>
  );
}
