import { SUMMONER_INFO_URL } from '../constants';
import  axios  from 'axios';

export async function getSummonersInfo(summonersName) {
    const res = await axios.get(SUMMONER_INFO_URL(summonersName));
    return res.data
}

export async function getLeagueInfo(id){
}

export async function getMatchInfo(puuid,qty){}