import React, { Suspense } from "react";
import Result from "../_components/result";
import { redirect } from "next/navigation";

const SearchPage = ({
  searchParams,
}: {
  searchParams: {
    term: string;
  };
}) => {
  // no search term found return to main page
  if (!searchParams.term) {
    redirect("/");
  }

  return (
    <main className="h-full max-w-screen-2xl mx-auto p-8">
      <Suspense fallback={<Result.Skeleton />}>
        <Result term={searchParams.term} />
      </Suspense>
    </main>
  );
};

export default SearchPage;
