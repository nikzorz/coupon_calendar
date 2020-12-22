import React from 'react';
import {DefaultFormLayout} from "../../Layouts/DefaultFormLayout";
import {ManageOfferLibraryForm} from "../../Forms/Offers/OfferLibrary/ManageOfferLibraryForm";
import {useEditOfferLibraries} from "../../../hooks/offers/use-edit-offerLibraries";
import {LoadingBackdrop} from "../../Common/LoadingBackdrop";
import {APIStatuses} from "../../../hooks/api/use-api";
import {Dialog, DialogActions, DialogTitle, Link} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";

export const ManageOfferLibraryPage: React.FC = () => {
  const {
    apiStatus,
    editOfferLibraries
  } = useEditOfferLibraries();
  
  return (
    <DefaultFormLayout
      title="Select Coops to Manage Library"
      maxWidth={false}
    >
      {/* Form */}
      <ManageOfferLibraryForm
        onSubmit={(values, offerLibraries) => {
          console.log('Submit Manage Offer Library: ', values)
          editOfferLibraries(values, offerLibraries)
        }}
      />
      {/* Submitting */}
      <LoadingBackdrop open={apiStatus === APIStatuses.VERIFYING} />
      {/* Success Dialog */}
      <Dialog
        open={apiStatus === APIStatuses.VALID}
        aria-labelledby="manageOfferLibrary-dialog-title"
        aria-describedby="manageOfferLibrary-dialog-description"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="manageOfferLibrary-dialog-title">
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