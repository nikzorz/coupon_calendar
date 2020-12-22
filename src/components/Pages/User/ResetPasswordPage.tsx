import React from 'react'
import {DefaultFormLayout} from "../../Layouts/DefaultFormLayout";
import {ResetPasswordForm} from "../../Forms/User/ResetPassword/ResetPasswordForm";

export const ResetPasswordPage: React.FC = () => {
  return (
    <DefaultFormLayout title="Reset Password" maxWidth="sm">
      <ResetPasswordForm
        onSubmit={(values) => {
          console.log('Reset Password values: ', values);
        }}
      />
    </DefaultFormLayout>
  )
}