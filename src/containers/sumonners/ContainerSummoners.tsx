import Header from "@/components/layout/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import SummonerBody from "@/containers/sumonners/summonerBody/SummonerBody";
import SummonerHead from "@/containers/sumonners/summonersHead/SummonerHead";
import useSummoner from "@/hooks/useSummoner";
import { useSummonerActions, useUserDocument } from "@/store/summonersStore";
import { UserDocument } from "@/types/types";
import { extractSummonerName, handleRiotId } from "@/utils";
import { firebaseAPI } from "@/utils/firebaseApi";
import { Box, Center, Flex } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ContainerSummoners() {
  const pathname = usePathname();

  const { refreshActions, isFetchLoading } = useSummoner();
  const userDocument = useUserDocument();
  const { setRiotId, setUserDocument, setMatchHistory } = useSummonerActions();

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
    //  console.log(userDocument);
  }, [userDocument]);

  useEffect(() => {
    return () => {
      setRiotId(null);
      setUserDocument(null);
      setMatchHistory(null);
    };
  }, []);

  return (
    <Center flexDirection={"column"} pb={8}>
      {userDocument && (
        <>
          <SummonerHead refreshActions={refreshActions} />
          <Box
            display={{ pc: "flex", mo: "none" }}
            className="tab"
            w="100%"
            h={"50px"}
            bg="white"
            borderTop={"1px solid"}
            borderColor="keyColor.border"
          ></Box>
          {!isFetchLoading ? <SummonerBody /> : <LoadingSpinner />}
        </>
      )}
    </Center>
  );
}
