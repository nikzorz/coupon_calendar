import React, {useEffect, useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {Offer} from "../../types/offers/offer";

export interface UseActiveOffersType extends CommonAPI {
  activeOffers?: Offer[]
}

export const useActiveOffers = ():UseActiveOffersType => {
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const [activeOffers, setActiveOffers] = useState<Offer[]>([])
  const api = useApi();

  const fetchActiveOffers = () => {

    setApiStatus(APIStatuses.VERIFYING);

    api.get<Offer[]>('/offers/active')
      .then((resp) => {
        setActiveOffers(resp.data);
        setApiStatus(APIStatuses.VALID);
      })
      .catch((error) => {
        console.log('List Offers error: ', error)
        setApiError(error.toString());
        setApiStatus(APIStatuses.INVALID);
      })
  }

  useEffect(() => {
    fetchActiveOffers();
  }, []);

  return {
    apiStatus,
    apiError,
    activeOffers,
  }
}