import React from 'react';
import {CustomOfferForm} from "../../Forms/Offers/CustomOfferForm/CustomOfferForm";
import {DefaultFormLayout} from "../../Layouts/DefaultFormLayout";
import {useCreateCustomOffer} from "../../../hooks/offers/use-create-customOffer";
import {Dialog, DialogActions, DialogTitle, Link} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {LoadingBackdrop} from "../../Common/LoadingBackdrop";
import {APIStatuses} from "../../../hooks/api/use-api";

export const CustomOfferCreatePage: React.FC = () => {
  const {
    apiStatus,
    createCustomOffer
  } = useCreateCustomOffer();
  
  return (
    <DefaultFormLayout
      title="Create Custom Offer"
    >
      {/* Form */}
      <CustomOfferForm
        onSubmit={(values) => {
          createCustomOffer(values)
        }}
      />
      {/* Submitting */}
      <LoadingBackdrop
        open={apiStatus === APIStatuses.VERIFYING}
      />
      {/* Success/Error Dialog */}
      <Dialog
        // open={[APIStatuses.VALID, APIStatuses.INVALID].includes(apiStatus)}
        open={true}
        aria-labelledby="customOffer-dialog-title"
        aria-describedby="customOffer-dialog-description"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="customOffer-dialog-title">
          Custom Offer created successfully
        </DialogTitle>
        <DialogActions>
          <Link
            component={RouterLink}
            to="/offers"
          >
            Return to Offer Library
          </Link>
        </DialogActions>
      </Dialog>
    </DefaultFormLayout>
  )
}