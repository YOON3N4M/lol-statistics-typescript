import { RiotId, UserDocument } from "@/types/types";
import { firebaseAPI } from "@/utils/firebaseApi";
import React, { useEffect, useState } from "react";
import { validateLocaleAndSetLanguage } from "typescript";

type UserValid = "initial" | "valid" | "inValid";

export default function useSummoner() {
  const [isInvalid, setIsInValid] = useState<UserValid>("initial");
  const [riotId, setRiotId] = useState<RiotId | null>(null);
  const [loadingPercent, setLoadingPercent] = useState(100);
  const [userDocument, setUserDocument] = useState<UserDocument | null>(null);
  const [matchIdArr, setMatchIdArr] = useState<string[]>([]);
  const [matchInfo, setMatchInfo] = useState([]);

  async function getUserDocument() {
    if (!riotId) return;
    const userDocument = await firebaseAPI.getUserDocumentByRiotId(riotId);
    console.log(userDocument);
    return userDocument;
  }

  function getRiotData() {}

  useEffect(() => {
    if (!riotId) return;
    async function initActions() {
      const userDocArr = await getUserDocument();
      if (!userDocArr) return;
      const vliadUserDoc = userDocArr[0];
      setUserDocument(vliadUserDoc);
      if (!vliadUserDoc.matchHistory) return;
      setMatchIdArr(vliadUserDoc.matchHistory);
    }

    initActions();
  }, [riotId]);

  return { userDocument, matchInfo, setRiotId };
}
