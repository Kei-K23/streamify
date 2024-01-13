import { createViewerToken } from "@/actions/view-token-action";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export async function useViewerToken(hostIdentity: string) {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
const createToken =async () => {
  try {
    const viewerToken = async createViewerToken();
  } catch (e : any) {
    toast.error("Something went wrong!")
  }
}
  }, [])
}
