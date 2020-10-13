import React from 'react';
import {useAuth} from "../../../hooks/use-auth";
import styled from 'styled-components';
import {LoginForm} from "../../Forms/LoginForm/LoginForm";
import {Paper, Typography} from "@material-ui/core";

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
    <Container>
      <Paper variant="elevation" elevation={2}>
        <FormContainer>
          <Typography variant="h3" component="h1">
            OIT Login
          </Typography>
          <LoginForm
            onSubmit={({email, password}) => {
              console.log('waaaa', email, password);
              auth.login(email, password);
            }}
          />
        </FormContainer>
      </Paper>
    </Container>
  )
}