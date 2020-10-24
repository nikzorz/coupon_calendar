import React from 'react';
import {useAuth} from "../../../hooks/auth/use-auth";
import styled from 'styled-components';
import {LoginForm} from "../../Forms/LoginForm/LoginForm";
import {DefaultFormLayout} from "../../Layouts/DefaultFormLayout";

const Container = styled.div`
  width: 450px;
  margin: 50px auto 0;
`;

const FormContainer = styled.div`
  padding: 0 14px 20px;
`;

export const LoginPage: React.FC = () => {
  const auth = useAuth();

  return (
    <DefaultFormLayout title="Login" maxWidth="sm">
      <LoginForm
        onSubmit={({email, password}) => {
          console.log('waaaa', email, password);
          auth.login(email, password);
        }}
      />
    </DefaultFormLayout>
  );
}