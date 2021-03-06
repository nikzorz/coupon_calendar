import React, {useEffect, useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {CustomOffer} from "../../types/offers/customOffers";

export interface UseCustomOffersType extends CommonAPI {
  customOffers?: CustomOffer[]
}

export const useCustomOffers = (customOfferIds: number[]): UseCustomOffersType => {
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const [customOffers, setCustomOffers] = useState<CustomOffer[]>([])
  const api = useApi();

  const fetchCustomOffers = (customOfferIds: number[]) => {
    setApiStatus(APIStatuses.VERIFYING);
    api.get<CustomOffer[]>(`/offers/custom?customOfferIds=${customOfferIds.join(',')}`)
      .then((resp) => {
        setCustomOffers(resp.data);
        setApiStatus(APIStatuses.VALID);
      })
      .catch((error) => {
        console.log('List Offers error: ', error)
        setApiError(error.toString());
        setApiStatus(APIStatuses.INVALID);
      })
  }

  useEffect(() => {
    fetchCustomOffers(customOfferIds);
  }, [customOfferIds]);

  return {
    apiStatus,
    apiError,
    customOffers,
  }
}