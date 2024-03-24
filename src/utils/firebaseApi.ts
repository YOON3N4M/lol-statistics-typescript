import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { dbService } from "@/fBase";
import {
  LeagueObj,
  MatchInfoObj,
  RiotAccount,
  RiotId,
  Summoner,
  UserDocument,
} from "@/types/types";

async function getUserDocument(summonersName: string) {
  const q = query(
    collection(dbService, "user"),
    where("nameRe", "==", summonersName?.replace(/ /g, ""))
  );

  const querySnapshot = await getDocs(q);
  let result;
  querySnapshot.forEach((doc) => {
    result = doc.data();
  });

  return result;
}

async function getUserDocumentByRiotId(riotId: RiotId) {
  const { name, tag } = riotId;

  const q = query(
    collection(dbService, "user"),
    where("riotId", "==", `${name}#${tag}`)
  );

  const querySnapshot = await getDocs(q);
  let result: UserDocument[] = [];

  querySnapshot.forEach((doc) => {
    if (doc.exists()) {
      result.push(doc.data() as UserDocument);
    }
  });

  if (result.length > 0) {
    return result;
  } else {
    return null;
  }
}

async function getUserCollection() {
  const querySnapshot = await getDocs(collection(dbService, "user"));
  const result: any = [];
  querySnapshot.forEach((doc) => {
    result.push(doc.data());
  });

  return result;
}

async function getMatchFromDB(MatchID: string) {
  const docRef = doc(dbService, "match", MatchID);
  const docSnap = await getDoc(docRef);

  return docSnap.data() as MatchInfoObj;
}

async function postUserDocumentOnDB(
  summonerInfo: Summoner,
  leagueInfo: LeagueObj[],
  matchIdArr: string[],
  riotAccount: RiotAccount
) {
  const lastRequestTime = new Date().getTime();
  const soloRank = leagueInfo.find(
    (league) => league.queueType === "RANKED_SOLO_5x5"
  );
  const freeRank = leagueInfo.find(
    (league) => league.queueType === "RANKED_FLEX_SR"
  );

  const userDocumentRef: UserDocument = {
    accountId: summonerInfo.accountId,
    id: summonerInfo.id,
    name: summonerInfo.name,
    nameRe: summonerInfo.name.replace(/ /g, ""),
    profileIconId: summonerInfo.profileIconId,
    puuid: summonerInfo.puuid,
    summonerLevel: summonerInfo.summonerLevel,
    matchHistory: matchIdArr || [],
    league1: soloRank || undefined,
    league2: freeRank || undefined,
    lastRequestTime,
    riotId: `${riotAccount.gameName}#${riotAccount.tagLine}`,
  };

  await setDoc(doc(dbService, "user", summonerInfo.puuid), userDocumentRef);
  return userDocumentRef;
}

async function postMatchInfoOnDB(matchInfo: MatchInfoObj) {
  const matchId = matchInfo.metadata.matchId;
  const docRef = doc(dbService, "match", matchId);

  const res = await setDoc(docRef, matchInfo);
}

export interface CompareResult {
  existMatchInfoArr: (string | MatchInfoObj)[];
  unExistMatchIdArr: (string | MatchInfoObj)[];
}
/**
 * matchIdArr를 인자로 받아 db에 해당 경기의 데이터가 있는지 조회합니다.
 *
 * 조회된 데이터는 existMatchInfoArr로 출력하고
 *
 *  조회 되지 않은 경기의 id만 다시 matchidArr로 출력합니다.
 */
async function compareMatchId(matchIdArr: string[]) {
  if (matchIdArr === undefined || matchIdArr.length < 1) return null;
  const searchResult = await Promise.all(
    matchIdArr.map(async (matchID: string) => {
      const res = await firebaseAPI.getMatchFromDB(matchID);
      if (res === undefined) return matchID;
      return res;
    })
  );
  const existMatchInfoArr = searchResult.filter((e) => typeof e !== "string");
  const unExistMatchIdArr = searchResult.filter(
    (e) => typeof e === "string"
  ) as string[];

  return { existMatchInfoArr, unExistMatchIdArr } as CompareResult;
}

export const firebaseAPI = {
  getUserDocument,
  getMatchFromDB,
  postUserDocumentOnDB,
  postMatchInfoOnDB,
  getUserDocumentByRiotId,
  getUserCollection,
  compareMatchId,
};
