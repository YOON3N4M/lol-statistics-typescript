// KEY and ETC....
export const API_KEY = process.env.REACT_APP_RIOT_API_KEY;

// API URL
export const SUMMONER_INFO_URL = (nickname) => {
  return `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${API_KEY}`;
};
export const LEAGUE_INFO_URL = (id) => {
  return `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`;
};
export const MATCH_INFO_URL = (puuid, qty) => {
  return `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${qty}&api_key=${API_KEY}`;
};
