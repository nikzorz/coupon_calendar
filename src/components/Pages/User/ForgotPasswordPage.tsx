import React from 'react';
import {DefaultFormLayout} from "../../Layouts/DefaultFormLayout";
import {ForgotPasswordForm} from "../../Forms/User/ForgotPassword/ForgotPasswordForm";

export const ForgotPasswordPage: React.FC = () => {
  return (
    <DefaultFormLayout title="Forgot Password" maxWidth="sm">
      <ForgotPasswordForm
        onSubmit={(values) => {
          console.log('Forgot password values: ', values)
        }}
      />
    </DefaultFormLayout>
  )
}