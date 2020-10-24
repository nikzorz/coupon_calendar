import React, {createContext, useContext, useEffect, useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {Offer} from "../../types/offers/offer";

export interface UseOffersContextType extends CommonAPI {
  offers?: Offer[]
  fetchOffers(offerIds: number[]): void
}

const offersContext = createContext<UseOffersContextType>({
  apiStatus: APIStatuses.UNVERIFIED,
  fetchOffers: () => {}
})

export const ProvideOffers: React.FC = ({children}) => {
  const offers = useProvideOffers();

  return (
    <offersContext.Provider value={offers}>
      {children}
    </offersContext.Provider>
  )
}

export const useOffers = (offerIds?: number[]) => {
  const con = useContext(offersContext)

  useEffect(() => {
    if (offerIds && offerIds.length) {
      con.fetchOffers(offerIds);
    }
  }, [offerIds]);

  return con;
}

export const useProvideOffers = ():UseOffersContextType => {
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const [offers, setOffers] = useState<Offer[]>()
  const api = useApi();

  const fetchOffers = (offerIds: number[]) => {
    api.get<Offer[]>(`/offers/list?offerIds=${offerIds.join(',')}`)
      .then((resp) => {
        setApiStatus(APIStatuses.VALID);
        setOffers(resp.data);
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
    offers,
    fetchOffers
  }
}