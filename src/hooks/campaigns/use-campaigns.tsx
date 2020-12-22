import React, { useEffect, useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {Campaign} from "../../types/campaigns/campaigns";

export interface UseCampaignsType extends CommonAPI {
  campaigns?: Campaign[]
}

export const useCampaigns = (startDate: Date, endDate: Date, marketId?: number):UseCampaignsType => {
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const [campaigns, setCampaigns] = useState<Campaign[]>();
  const api = useApi();

  const fetchCampaigns = (marketId: number, startDate: Date, endDate: Date) => {
    const startDateParam = encodeURIComponent(startDate.toISOString());
    const endDateParam = encodeURIComponent(endDate.toISOString());

    setApiStatus(APIStatuses.VERIFYING);

    api.get<Campaign[]>(`/campaign/list?marketId=${marketId}&startDate=${startDateParam}&endDate=${endDateParam}`)
      .then((resp) => {
        setCampaigns(resp.data);
        setApiStatus(APIStatuses.VALID)
      })
      .catch((error) => {
        console.log('List Campaigns error: ', error)
        setApiError(error.toString());
        setApiStatus(APIStatuses.INVALID);
      })
  }

  useEffect(() => {
    if (marketId) {
      fetchCampaigns(marketId, startDate, endDate);
    }
  }, [marketId, startDate.toISOString(), endDate.toISOString()])

  return {
    apiStatus,
    apiError,
    campaigns,
  }
}