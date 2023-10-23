import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { dbService } from "../fBase";

async function getUserDocument(summonersName: string) {
  const q = query(
    collection(dbService, "user"),
    where("nameRe", "==", summonersName?.replace(/ /g, ""))
  );
  
  const querySnapshot = await getDocs(q);
  let result  
  querySnapshot.forEach((doc) => {
    result = doc.data()
  });
  
  return result
}

async function getMatchFromDB(MatchID: string) {
  const docRef = doc(dbService, "match", MatchID);
  const docSnap = await getDoc(docRef);
  const docSnapData = docSnap.data();

  return docSnapData
}

export const firebaseAPI = {
  getUserDocument,
  getMatchFromDB
}