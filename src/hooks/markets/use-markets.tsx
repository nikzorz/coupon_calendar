import React, {createContext, useContext, useEffect, useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {Market} from "../../types/markets/markets";
import {useAuth} from "../auth/use-auth";

export interface UseMarketContextType extends CommonAPI {
  allMarkets?: Market[]
  userMarkets?: Market[]
  userMarketIds?: number[]
  currentMarket?: Market
  marketIdToMarketNameMap?: Record<string, string>
  setCurrentMarket(marketId: number): void
}

const marketsContext = createContext<UseMarketContextType>({
  apiStatus: APIStatuses.UNVERIFIED,
  setCurrentMarket(marketId: number) {}
})

export const ProvideMarkets: React.FC = ({ children }) => {
  const markets = useProvideMarkets();

  return (
    <marketsContext.Provider value={markets}>
      {children}
    </marketsContext.Provider>
  )
}

export const useMarkets = () => {
  return useContext(marketsContext);
}

const sortMarkets = (a: Market, b: Market): -1 | 0 | 1 => {
  const nameA = a.marketName.toUpperCase(); // ignore upper and lowercase
  const nameB = b.marketName.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}

export const useProvideMarkets = ():UseMarketContextType => {
  // TODO Should we useState or useReducer ???
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const [allMarkets, setAllMarkets] = useState<Market[]>();
  const [userMarkets, setUserMarkets] = useState<Market[]>();
  const [userMarketIds, setUserMarketIds] = useState<number[]>();
  const [currentMarket, changeCurrentMarket] = useState<Market>();
  const [marketIdToMarketNameMap, setMarketIdToMarketNameMap] = useState<Record<string, string>>();
  const auth = useAuth();
  const api = useApi();

  const setCurrentMarket = (marketId: number) => {
    changeCurrentMarket(userMarkets?.find((market) => market.marketId === marketId))
  }

  const fetchMarkets = () => {
    return api.get<Market[]>('/markets')
      .then((resp) => {
        const sortedMarkets = resp.data.sort(sortMarkets);
        setMarketIdToMarketNameMap(sortedMarkets.reduce((acc, market) => {
          acc[market.marketId] = market.marketName;
          return acc;
        }, {} as Record<string, string>))
        setAllMarkets(sortedMarkets);
      })
      .catch((error) => {
        console.log('Get Markets error: ', error)
        setApiError(error.toString());
        setApiStatus(APIStatuses.INVALID);
      });
  }

  const fetchUserMarkets = (userId: number) => {
    api.get<Market[]>(`/markets?userId=${userId}`)
      .then((resp) => {
        const sortedMarkets = resp.data.sort(sortMarkets);
        setUserMarkets(sortedMarkets);
        setUserMarketIds(sortedMarkets.map((market) => market.marketId))
        changeCurrentMarket(resp.data[0]);
        setApiStatus(APIStatuses.VALID);
      })
      .catch((error) => {
        console.log('Get Markets error: ', error)
        setApiError(error.toString());
        setApiStatus(APIStatuses.INVALID);
      });
  }

  // Fetch Markets after user loads.
  // TODO this doesn't feel right...
  useEffect(() => {
    if (auth.authUser?.userId) {
      setApiStatus(APIStatuses.VERIFYING);
      fetchMarkets()
        .then(() => {
          if (auth.authUser?.userId) {
            fetchUserMarkets(auth.authUser.userId);
          }
        });
    }
  }, [auth.authUser]);

  return {
    apiStatus,
    apiError,
    allMarkets,
    userMarkets,
    userMarketIds,
    currentMarket,
    marketIdToMarketNameMap,
    setCurrentMarket,
  }
}