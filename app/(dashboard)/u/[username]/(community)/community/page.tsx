import React from "react";
import { DataTable } from "../_components/data-table";
import { columns } from "../_components/columns";
import { getAllBlockingUsers } from "@/services/block-service";
import { format } from "date-fns";

const CommunityPage = async () => {
  const data = await getAllBlockingUsers();

  const formattedData = data.map((block) => ({
    id: block.id,
    user: block.blocking,
    createdAt: format(new Date(block.createdAt), "dd/MM/yyyy"),
  }));

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
};

export default CommunityPage;
