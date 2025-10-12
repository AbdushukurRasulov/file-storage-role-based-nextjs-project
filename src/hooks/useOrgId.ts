"use client";
import { useOrganization, useUser } from "@clerk/nextjs";

export function useOrgId() {
  const { isLoaded: orgLoaded, organization } = useOrganization();
  const { isLoaded: userLoaded, user } = useUser();

  if (!orgLoaded || !userLoaded) return undefined;

  return organization?.id ?? user?.id;
}
