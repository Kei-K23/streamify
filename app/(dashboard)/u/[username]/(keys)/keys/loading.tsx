"use client";
import React from "react";
import UrlsCard from "../_components/url-card";

const KeysPageLoading = () => {
  return (
    <div className="p-6 w-full ">
      <div className="space-y-4 w-full mt-5">
        {[...Array(2)].map((_, i) => (
          <UrlsCard.Skeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default KeysPageLoading;
