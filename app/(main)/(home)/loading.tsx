"use client";
import React from "react";
import Result from "./_components/result";

const HomePageLoading = () => {
  return (
    <main className="h-full max-w-screen-2xl mx-auto p-8">
      <Result.Skeleton />
    </main>
  );
};

export default HomePageLoading;
