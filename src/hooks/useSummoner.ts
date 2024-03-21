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
  const [isInvalid, setIsInValid] = useState<UserValid>("initial");
  const [riotId, setRiotId] = useState<RiotId | null>(null);
  const [loadingPercent, setLoadingPercent] = useState(100);
  const [userDocument, setUserDocument] = useState<UserDocument | null>(null);
  const [matchIdArr, setMatchIdArr] = useState<string[]>([]);
  const [matchInfo, setMatchInfo] = useState<MatchInfoObj[]>([]);

  async function handleMatchIdArr() {
    const compareResult = await firebaseAPI.compareMatchId(matchIdArr);
    if (!compareResult) return;
    const mergedResult = await handleCompareResult(compareResult);
    setMatchInfo(mergedResult);
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
    if (!riotId) return;
    const riotDataRes = await riotApi.getRiotsSummonerData(riotId);
    if (!riotDataRes) return;
    const { accountRes, summonerRes, leagueRes, matchIdRes } = riotDataRes;
    const postUserDocRes = await firebaseAPI.postUserDocumentOnDB(
      summonerRes,
      leagueRes,
      matchIdArr,
      accountRes
    );
    setUserDocument(postUserDocRes);
    setMatchIdArr(matchIdArr);
  }

  useEffect(() => {
    async function initActions() {
      if (!riotId) return;
      const userDocArr = await firebaseAPI.getUserDocumentByRiotId(riotId);

      // ^ irebase에 있을때
      if (userDocArr) {
        const vliadUserDoc = userDocArr[0];
        setUserDocument(vliadUserDoc);
        if (!vliadUserDoc.matchHistory) return;
        setMatchIdArr(vliadUserDoc.matchHistory);
      } else {
        // ^ firebase에 없을때
      }
    }

    initActions();
  }, [riotId]);

  useEffect(() => {
    if (matchIdArr.length < 1) return;
    handleMatchIdArr();
  }, [matchIdArr]);

  return { userDocument, matchInfo, setRiotId, refreshActions };
}
