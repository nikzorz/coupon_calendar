import React, {createContext, useContext, useEffect, useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {OfferLibrary} from "../../types/offers/offerLibrary";
import {useMarkets} from "../markets/use-markets";

export interface UseOfferlibraryContextType extends CommonAPI {
  offerLibraries?: OfferLibrary[]
}

const offerLibraryContext = createContext<UseOfferlibraryContextType>({
  apiStatus: APIStatuses.UNVERIFIED,
})

export const ProvideOfferLibraries: React.FC = ({children}) => {
  const offerLibraries = useProvideOfferLibraries();

  return (
    <offerLibraryContext.Provider value={offerLibraries}>
      {children}
    </offerLibraryContext.Provider>
  )
}

export const useOfferLibraries = () => {
  return useContext(offerLibraryContext)
}

export const useProvideOfferLibraries = ():UseOfferlibraryContextType => {
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const [offerLibraries, setOfferLibraries] = useState<OfferLibrary[]>();
  const api = useApi();
  const markets = useMarkets();

  const fetchOfferLibrariesList = (marketIds: number[]) => {
    api.get<OfferLibrary[]>(`/offers/library/list?marketIds=${marketIds.join(',')}`)
      .then((resp) => {
        setApiStatus(APIStatuses.VALID);
        setOfferLibraries(resp.data);
      })
      .catch((error) => {
        console.log('List Offer Libraries error: ', error)
        setApiStatus(APIStatuses.INVALID);
        const stringError = error.toString();
        setApiError(stringError);
      })
  }

  useEffect(() => {
    if (markets.userMarkets) {
      fetchOfferLibrariesList(markets.userMarkets.map(market => market.marketId))
    }
  }, [markets.userMarkets])

  return {
    apiStatus,
    apiError,
    offerLibraries
  }
}