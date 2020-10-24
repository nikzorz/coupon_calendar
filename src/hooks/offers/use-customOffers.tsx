import React, {createContext, useContext, useEffect, useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {CustomOffer} from "../../types/offers/customOffers";

export interface UseOffersContextType extends CommonAPI {
  customOffers?: CustomOffer[]
  fetchCustomOffers(offerIds: number[]): void
}

const customOffersContext = createContext<UseOffersContextType>({
  apiStatus: APIStatuses.UNVERIFIED,
  fetchCustomOffers: () => {}
})

export const ProvideCustomOffers: React.FC = ({children}) => {
  const customOffers = useProvideCustomOffers();

  return (
    <customOffersContext.Provider value={customOffers}>
      {children}
    </customOffersContext.Provider>
  )
}

export const useCustomOffers = (customOfferIds: number[]) => {
  const con = useContext(customOffersContext)

  useEffect(() => {
    con.fetchCustomOffers(customOfferIds);
  }, [customOfferIds]);

  return con;
}

export const useProvideCustomOffers = ():UseOffersContextType => {
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const [customOffers, setCustomOffers] = useState<CustomOffer[]>()
  const api = useApi();

  const fetchCustomOffers = (customOfferIds: number[]) => {
    api.get<CustomOffer[]>(`/offers/custom?customOfferIds=${customOfferIds.join(',')}`)
      .then((resp) => {
        setApiStatus(APIStatuses.VALID);
        setCustomOffers(resp.data);
      })
      .catch((error) => {
        console.log('List Offers error: ', error)
        setApiStatus(APIStatuses.INVALID);
        const stringError = error.toString();
        setApiError(stringError);
      })
  }

  return {
    apiStatus,
    apiError,
    customOffers,
    fetchCustomOffers
  }
}