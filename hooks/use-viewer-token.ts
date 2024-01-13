"use client";

import { createViewerToken } from "@/actions/view-token-action";
import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast } from "sonner";

export function useViewerToken(hostIdentity: string) {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decoded = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };
        const name = decoded?.name;
        const identity = decoded?.jti;

        if (name) {
          setName(name);
        }

        if (identity) {
          setIdentity(identity);
        }
      } catch (e: any) {
        toast.error("Something went wrong!");
      }
    };

    createToken();
  }, [hostIdentity]);

  return {
    name,
    identity,
    token,
  };
}
