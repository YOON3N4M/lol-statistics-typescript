import Header from "@/components/layout/Header";
import useSummoner from "@/hooks/useSummoner";
import { UserDocument } from "@/types/types";
import { extractSummonerName, handleRiotId } from "@/utils";
import { firebaseAPI } from "@/utils/firebaseApi";
import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ContainerSummoners() {
  const pathname = usePathname();
  const { setRiotId, userDocument } = useSummoner();

  function extractRiotId() {
    const sumonnerName = extractSummonerName(pathname);
    const riotId = handleRiotId(sumonnerName, "-");
    setRiotId(riotId);
  }

  useEffect(() => {
    if (!pathname) return;
    extractRiotId();
  }, [pathname]);
  return <Box></Box>;
}
