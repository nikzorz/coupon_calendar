import React, {createContext, useContext, useEffect, useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {Market} from "../../types/markets/markets";
import {useAuth} from "../auth/use-auth";

export interface UseMarketContextType extends CommonAPI {
  allMarkets?: Market[]
  userMarkets?: Market[]
  currentMarket?: number
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

export const useProvideMarkets = ():UseMarketContextType => {
  // TODO Should we useState or useReducer ???
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const [allMarkets, setAllMarkets] = useState<Market[]>();
  const [userMarkets, setUserMarkets] = useState<Market[]>();
  const [currentMarket, setCurrentMarket] = useState<number>();
  const auth = useAuth();
  const api = useApi();

  const fetchMarkets = () => {
    api.get<Market[]>('/markets')
      .then((resp) => {
        setAllMarkets(resp.data);
      })
      .catch((error) => {
        console.log('Get Markets error: ', error)
        setApiStatus(APIStatuses.INVALID);
        const stringError = error.toString();
        setApiError(stringError);
      });
  }

  const fetchUserMarkets = (userId: number) => {
    api.get<Market[]>(`/markets?userId=${userId}`)
      .then((resp) => {
        setApiStatus(APIStatuses.VALID);
        setUserMarkets(resp.data);
        setCurrentMarket(resp.data[0].marketId);
      })
      .catch((error) => {
        console.log('Get Markets error: ', error)
        setApiStatus(APIStatuses.INVALID);
        const stringError = error.toString();
        setApiError(stringError);
      });
  }

  // Fetch all Markets immediately
  useEffect(() => {
    fetchMarkets();
  }, []);

  // Fetch User Markets after user loads
  useEffect(() => {
    if (auth.authUser?.userId) {
      fetchUserMarkets(auth.authUser.userId)
    }
  }, [auth.authUser]);

  return {
    apiStatus,
    apiError,
    allMarkets,
    userMarkets,
    currentMarket,
    setCurrentMarket,
  }
}