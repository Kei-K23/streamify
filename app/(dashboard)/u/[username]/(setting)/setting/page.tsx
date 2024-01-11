import React from "react";
import ToggleSettingCard from "../_components/toggle-setting-card";
import { getStreamByUserId } from "@/services/stream-service";
import { getUserByUsername } from "@/services/user-service";

const SettingPage = async ({ params }: { params: { username: string } }) => {
  const user = await getUserByUsername(params.username);

  const stream = await getStreamByUserId(user?.id!);

  return (
    <div className="p-6 w-full ">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold">Chat Setting</h1>
        <p className="text-muted-foreground">
          Make your own setting for your stream.
        </p>
      </div>

      <div className="space-y-4 w-full mt-5">
        <ToggleSettingCard
          label="Enable chat"
          value={stream?.isChatEnable!}
          field="isChatEnable"
        />
        <ToggleSettingCard
          label="Enable delay chat"
          value={stream?.isDelayChat!}
          field="isDelayChat"
        />
        <ToggleSettingCard
          label="Allow chat for only followers"
          value={stream?.isChatFollowerOnly!}
          field="isChatFollowerOnly"
        />
      </div>
    </div>
  );
};

export default SettingPage;
