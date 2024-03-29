import { useRiotId, useSummonerActions } from "@/store/summonersStore";
import {
  MatchInfoArray,
  MatchInfoObj,
  RiotId,
  UserDocument,
} from "@/types/types";
import { CompareResult, firebaseAPI } from "@/utils/firebaseApi";
import { riotApi } from "@/utils/riotApi";
import React, { useEffect, useState } from "react";

type UserValid = "initial" | "valid" | "inValid";

export default function useSummoner() {
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isInvalid, setIsInValid] = useState<UserValid>("initial");
  const [loadingPercent, setLoadingPercent] = useState(100);
  const [matchIdArr, setMatchIdArr] = useState<string[]>([]);

  const riotId = useRiotId();
  const { setMatchHistory, setUserDocument, setRiotId } = useSummonerActions();

  async function handleMatchIdArr() {
    const compareResult = await firebaseAPI.compareMatchId(matchIdArr);
    if (!compareResult) return;
    const mergedResult = await handleCompareResult(compareResult);
    setMatchHistory(mergedResult);
  }

  async function handleCompareResult(compareResult: CompareResult) {
    const { existMatchInfoArr, unExistMatchIdArr } = compareResult;

    if (unExistMatchIdArr === undefined) {
      return existMatchInfoArr as MatchInfoObj[];
    } else {
      const getMatchInfoAndPost = await Promise.all(
        unExistMatchIdArr.map(async (matchID: any) => {
          const matchInfo = await riotApi.getMatchInfo(matchID);
          const firebaseRes = await firebaseAPI.postMatchInfoOnDB(matchInfo);
          return matchInfo;
        })
      );
      const mergedArr = [...existMatchInfoArr, ...getMatchInfoAndPost];
      return mergedArr as MatchInfoObj[];
    }
  }

  async function refreshActions() {
    console.log("전적 갱신");
    setIsFetchLoading(true);
    setMatchIdArr([]);
    if (!riotId) return;
    const riotDataRes = await riotApi.getRiotsSummonerData(riotId);
    if (!riotDataRes) return;
    const { accountRes, summonerRes, leagueRes, matchIdRes } = riotDataRes;

    const postUserDocRes = await firebaseAPI.postUserDocumentOnDB(
      summonerRes,
      leagueRes,
      matchIdRes,
      accountRes
    );
    setUserDocument(postUserDocRes);
    setMatchIdArr(matchIdRes);
    setIsFetchLoading(false);
  }

  useEffect(() => {
    async function initActions() {
      if (!riotId) return;
      setIsFetchLoading(true);
      const userDocArr = await firebaseAPI.getUserDocumentByRiotId(riotId);

      // ^ firebase에 있을때
      if (userDocArr) {
        const vliadUserDoc = userDocArr[0];
        setUserDocument(vliadUserDoc);
        if (!vliadUserDoc.matchHistory) return;
        setMatchIdArr(vliadUserDoc.matchHistory);
      } else {
        // ^ firebase에 없을때
        refreshActions();
      }
      setIsFetchLoading(false);
    }

    initActions();
  }, [riotId]);

  useEffect(() => {
    setMatchHistory([]);
    if (matchIdArr.length < 1) return;
    console.log("갱신된");
    handleMatchIdArr();
  }, [matchIdArr]);

  return { refreshActions, isFetchLoading };
}
