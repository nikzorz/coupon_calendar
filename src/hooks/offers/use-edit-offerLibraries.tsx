import {useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {ManageOfferLibraryFormInputs} from "../../components/Forms/Offers/OfferLibrary/ManageOfferLibraryForm";
import {OfferLibrary} from "../../types/offers/offerLibrary";

export interface UseEditOfferLibrariesTypes extends CommonAPI {
  editOfferLibraries(values: ManageOfferLibraryFormInputs, offerLibraries: OfferLibrary[]): void
}

export const useEditOfferLibraries = ():UseEditOfferLibrariesTypes => {
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const api = useApi();

  const editOfferLibraries = (values: ManageOfferLibraryFormInputs, offerLibraries: OfferLibrary[]) => {
    setApiStatus(APIStatuses.VERIFYING)

    const requests = values.marketIds.map((marketId) => {
      const currentLibrary = offerLibraries.find((offerLibrary) => offerLibrary.marketId === marketId)

      // Editing a current library
      if (currentLibrary) {
        const updatedLibrary = {
          ...currentLibrary,
          offerIds: values.offerIds
        } as OfferLibrary

        return api.put(`/offers/library/${currentLibrary.offerLibraryId}`, updatedLibrary)
      } else {
        // Creating a new Library
        const newLibrary = {
          marketId,
          offerIds: values.offerIds,
          customOfferIds: [],
        } as OfferLibrary
        return api.post('/offers/library', newLibrary)
      }
    })

    Promise.all(requests)
      .then(() => {
        setApiStatus(APIStatuses.VALID)
      })
      .catch((error) => {
        console.log('Edit Offer Libraries Error: ', error)
        setApiError(error.toString())
        setApiStatus(APIStatuses.INVALID)
      })
  }

  return {
    apiStatus,
    apiError,
    editOfferLibraries
  }
}