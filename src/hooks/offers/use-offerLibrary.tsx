import React, { useEffect, useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {OfferLibrary} from "../../types/offers/offerLibrary";

export interface UseOfferlibraryType extends CommonAPI {
  offerLibrary?: OfferLibrary
}

export const useOfferLibrary = (marketId?: number):UseOfferlibraryType => {
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const [offerLibrary, setOfferLibrary] = useState<OfferLibrary>();
  const api = useApi();

  const getOfferLibrary = (marketId: number) => {
    setApiStatus(APIStatuses.VERIFYING);
    api.get<OfferLibrary[]>(`/offers/library/list?marketIds=${marketId}`)
      .then((resp) => {
        setOfferLibrary(resp.data[0]);
        setApiStatus(APIStatuses.VALID);
      })
      .catch((error) => {
        console.log('List Offer Libraries error: ', error)
        setApiError(error.toString());
        setApiStatus(APIStatuses.INVALID);
      })
  }

  useEffect(() => {
    if (marketId) {
      getOfferLibrary(marketId)
    }
  }, [marketId])

  return {
    apiStatus,
    apiError,
    offerLibrary
  }
}