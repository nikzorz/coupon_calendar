import React, { useEffect, useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {OfferLibrary} from "../../types/offers/offerLibrary";

export interface UseOfferLibrariesType extends CommonAPI {
  offerLibraries?: OfferLibrary[]
}

export const useOfferLibraries = (marketIds?: number[]):UseOfferLibrariesType => {
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const [offerLibraries, setOfferLibrary] = useState<OfferLibrary[]>();
  const api = useApi();

  const getOfferLibraries = (marketIds: number[]) => {
    setApiStatus(APIStatuses.VERIFYING);
    api.get<OfferLibrary[]>(`/offers/library/list?marketIds=${marketIds.join(',')}`)
      .then((resp) => {
        setOfferLibrary(resp.data);
        setApiStatus(APIStatuses.VALID);
      })
      .catch((error) => {
        console.log('List Offer Libraries error: ', error)
        setApiError(error.toString());
        setApiStatus(APIStatuses.INVALID);
      })
  }

  useEffect(() => {
    if (marketIds && marketIds.length > 0) {
      getOfferLibraries(marketIds)
    }
  }, [marketIds])

  return {
    apiStatus,
    apiError,
    offerLibraries
  }
}