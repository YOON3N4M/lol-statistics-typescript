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
    league1: soloRank || null,
    league2: freeRank || null,
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

export const firebaseAPI = {
  getUserDocument,
  getMatchFromDB,
  postUserDocumentOnDB,
  postMatchInfoOnDB,
  getUserDocumentByRiotId,
  getUserCollection,
};
