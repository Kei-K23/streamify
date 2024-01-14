export type StreamWithUser = {
  user: {
    id: string;
    username: string;
    imageUrl: string | null;
    bio: string | null;
    externalUserId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  id: string;
  name: string;
  thumbnailImg: string | null;
  ingressId: string | null;
  serverUrl: string | null;
  streamKey: string | null;
  isLive: boolean;
  isChatEnable: boolean;
  isDelayChat: boolean;
  isChatFollowerOnly: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
