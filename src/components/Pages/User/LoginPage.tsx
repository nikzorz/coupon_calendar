import React from 'react';
import {useAuth} from "../../../hooks/auth/use-auth";
import {LoginForm} from "../../Forms/User/LoginForm/LoginForm";
import {DefaultFormLayout} from "../../Layouts/DefaultFormLayout";

export const LoginPage: React.FC = () => {
  const auth = useAuth();

  return (
    <DefaultFormLayout title="Login" maxWidth="sm">
      <LoginForm
        onSubmit={({email, password}) => {
          auth.login(email, password);
        }}
      />
    </DefaultFormLayout>
  );
}