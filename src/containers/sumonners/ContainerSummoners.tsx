import Header from "@/components/layout/Header";
import SummonerHead from "@/components/summonerPage/SummonerHead";
import useSummoner from "@/hooks/useSummoner";
import { useSummonerActions, useUserDocument } from "@/store/summonersStore";
import { UserDocument } from "@/types/types";
import { extractSummonerName, handleRiotId } from "@/utils";
import { firebaseAPI } from "@/utils/firebaseApi";
import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ContainerSummoners() {
  const pathname = usePathname();

  const { refreshActions } = useSummoner();
  const userDocument = useUserDocument();
  const { setRiotId } = useSummonerActions();

  function extractRiotId() {
    const sumonnerName = extractSummonerName(pathname);
    const riotId = handleRiotId(sumonnerName, "-");
    setRiotId(riotId);
  }

  useEffect(() => {
    if (!pathname) return;
    extractRiotId();
  }, [pathname]);

  useEffect(() => {
    console.log(userDocument);
  }, [userDocument]);

  return (
    <Box>
      {userDocument && (
        <>
          <SummonerHead refreshActions={refreshActions} />
        </>
      )}
    </Box>
  );
}
