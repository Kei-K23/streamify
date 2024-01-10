import React from "react";

interface UsernamePageProps {
  params: {
    username: string;
  };
}

const UsernamePage = ({ params }: UsernamePageProps) => {
  return <div>User Id {params.username}</div>;
};

export default UsernamePage;
