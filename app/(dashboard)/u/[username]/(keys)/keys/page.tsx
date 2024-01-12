import { Button } from "@/components/ui/button";
import { getStreamByUserId } from "@/services/stream-service";
import { getUserByUsername } from "@/services/user-service";
import React from "react";
import UrlsCard from "../_components/url-card";
import StreamConnectModal from "../_components/stream-connect-modal";

const KeysPage = async ({ params }: { params: { username: string } }) => {
  const user = await getUserByUsername(params.username);
  const stream = await getStreamByUserId(user?.id!);

  return (
    <div className="p-6 w-full ">
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-y-4 md:gap-x-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">Keys an URLs</h1>
          <p className="text-muted-foreground">
            Generate and connect using keys and url with streaming software.
          </p>
        </div>
        <StreamConnectModal />
      </div>

      <div className="space-y-4 w-full mt-5">
        <UrlsCard value={stream?.serverUrl} label="Server URL" />

        <UrlsCard
          showValue={false}
          value={stream?.streamKey}
          label="Stream Key"
        />
      </div>
    </div>
  );
};

export default KeysPage;
