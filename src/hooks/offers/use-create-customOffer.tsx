import {useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {CustomOfferFormInputs} from "../../components/Forms/Offers/CustomOfferForm/CustomOfferForm";

export interface UseCreateCustomOfferTypes extends CommonAPI {
  createCustomOffer(values: CustomOfferFormInputs): void
}

export const useCreateCustomOffer = ():UseCreateCustomOfferTypes => {
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const api = useApi();

  const createCustomOffer = (values: CustomOfferFormInputs) => {
    setApiStatus(APIStatuses.VERIFYING)

    api.post('/offers/custom', values)
      .then(() => {
        setApiStatus(APIStatuses.VALID)
      })
      .catch((error) => {
        console.log('Create Custom Offer error: ', error)
        setApiError(error.toString())
        setApiStatus(APIStatuses.INVALID)
      })
  }

  return {
    apiStatus,
    apiError,
    createCustomOffer
  }
}