"use client";
import React from "react";
import ToggleSettingCard from "../_components/toggle-setting-card";

const SettingPageLoading = () => {
  return (
    <div className="p-6 w-full ">
      <div className="space-y-4 w-full mt-5">
        {[...Array(3)].map((_, i) => (
          <ToggleSettingCard.Skeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default SettingPageLoading;
