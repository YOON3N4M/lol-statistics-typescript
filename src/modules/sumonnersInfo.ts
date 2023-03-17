const SET_USERNAME = "SET_USERNAME";
const SET_SUMMONERS_INFO = "SET_SUMMONERS_INFO";
const CLEAR_SUMMONERS_INFO = "CLEAR_SUMMONERS_INFO";
const SET_SUMMONERS_LOADING_TRUE = "SET_LOADING_TRUE";
const SET_SUMMONERS_LOADING_FALSE = "SET_LOADING_FALSE";
const SET_LEAGUE_INFO = "SET_LEAGUE_INFO";
const SET_TIER_CAP = "SET_TIER_CAP";
const CLEAR_ALL = "CLEAR_ALL";
const SET_MATCH_ID_ARR = "SET_MATCH_ID_ARR";

export const setUserName = (userName: string) => ({
  type: SET_USERNAME,
  userName,
});
export const setSummonersInfo = (data: object) => ({
  type: SET_SUMMONERS_INFO,
  data,
});
export const clearSummonersInfo = () => ({ type: CLEAR_SUMMONERS_INFO });
export const setSummonersLoadingTrue = () => ({
  type: SET_SUMMONERS_LOADING_TRUE,
});
export const setSummonersLoadingFalse = () => ({
  type: SET_SUMMONERS_LOADING_FALSE,
});
export const setLeagueInfo = (data: []) => ({ type: SET_LEAGUE_INFO, data });
export const setTierCap = (data: string) => ({ type: SET_TIER_CAP, data });
export const clearAll = () => ({ type: CLEAR_ALL });
export const setMatchIdArr = (data: []) => ({ type: SET_MATCH_ID_ARR, data });

const initialState = {
  userName: "",
  summonersInfo: {},
  summonersLoading: true,
  leagueInfo: [],
  matchIdArr: [],
};

export default function summonersInfo(state = initialState, action: any) {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        userName: action.userName,
      };
    case SET_SUMMONERS_INFO:
      return {
        ...state,
        summonersInfo: action.data,
      };
    case CLEAR_SUMMONERS_INFO:
      return {
        ...state,
        summonersInfo: {},
      };
    case SET_SUMMONERS_LOADING_TRUE:
      return {
        ...state,
        summonersLoading: true,
      };
    case SET_SUMMONERS_LOADING_FALSE:
      return {
        ...state,
        summonersLoading: false,
      };
    case SET_LEAGUE_INFO:
      return {
        ...state,
        leagueInfo: action.data,
      };
    case SET_TIER_CAP:
      return {
        ...state,
        tierCap: action.data,
      };
    case SET_MATCH_ID_ARR:
      return {
        ...state,
        matchIdArr: action.data,
      };

    case CLEAR_ALL:
      // 이때 userName은 초기화 하지 않는다. Home에서 submit이 이루어진후 userName은 새로운 값이 들어가므로
      return {
        userName: "",
        summonersInfo: {},
        summonersLoading: true,
        leagueInfo: [],
        matchIdArr: [],
      };
    default:
      return state;
  }
}
