import React, {useEffect, useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {Offer} from "../../types/offers/offer";

export interface UseOffersType extends CommonAPI {
  offers?: Offer[]
}

export const useOffers = (offerIds?: number[]):UseOffersType => {
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const [offers, setOffers] = useState<Offer[]>([])
  const api = useApi();

  const fetchOffers = (offerIds: number[]) => {

    setApiStatus(APIStatuses.VERIFYING);

    api.get<Offer[]>(`/offers/list?offerIds=${offerIds.join(',')}`)
      .then((resp) => {
        setOffers(resp.data);
        setApiStatus(APIStatuses.VALID);
      })
      .catch((error) => {
        console.log('List Offers error: ', error)
        setApiError(error.toString());
        setApiStatus(APIStatuses.INVALID);
      })
  }

  useEffect(() => {
    if (offerIds && offerIds.length) {
      fetchOffers(offerIds);
    }
  }, [offerIds]);

  return {
    apiStatus,
    apiError,
    offers,
  }
}