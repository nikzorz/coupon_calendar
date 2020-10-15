import React from 'react';
import {CustomOfferForm} from "../../Forms/CustomOfferForm/CustomOfferForm";
import {DefaultFormLayout} from "../../Layouts/DefaultFormLayout";

export const CustomOfferCreatePage: React.FC = () => {
  return (
    <DefaultFormLayout
      title="Create Custom Offer"
    >
      <CustomOfferForm
        onSubmit={(values) => console.log(values)}
      />
    </DefaultFormLayout>
  )
}