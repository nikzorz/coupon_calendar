import React from 'react';
import {DefaultFormLayout} from "../../Layouts/DefaultFormLayout";
import {ChangePasswordForm} from "../../Forms/User/ChangePassword/ChangePasswordForm";

export const ChangePasswordPage: React.FC = () => {
  return (
    <DefaultFormLayout title="Change Password" maxWidth="sm">
      <ChangePasswordForm
        onSubmit={(values) => {
          console.log('Change Password', values);
        }}
      />
    </DefaultFormLayout>
  )
}