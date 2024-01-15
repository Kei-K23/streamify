import { Skeleton } from "@/components/ui/skeleton";
import { getStreamsByTerms } from "@/services/feed-service";
import React from "react";
import ResultCard from "./result-card";

const Result = async ({ term }: { term: string }) => {
  const streams = await getStreamsByTerms(term);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">
        Results for term &quot;{term}&quot;
      </h1>
      {streams.length === 0 && (
        <h2 className="text-lg text-muted-foreground">
          Sorry! No stream to show
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {streams.map((stream) => (
          <ResultCard key={stream.id} stream={stream} />
        ))}
      </div>
    </div>
  );
};

Result.Skeleton = function ResultSkeleton() {
  return (
    <div>
      <Skeleton className="w-[150px] h-6 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <ResultCard.Skeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default Result;
