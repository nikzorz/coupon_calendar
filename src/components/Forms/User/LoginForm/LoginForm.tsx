import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Link,
  Typography,
  Box,
  Grid,
  TextField
} from '@material-ui/core'
import { Link as RouterLink } from "react-router-dom";
import * as yup from "yup";
import {KeyboardDatePicker} from "@material-ui/pickers";

export interface LoginFormInputs {
  email: string
  password: string
}

export interface LoginFormProps {
  onSubmit(values: LoginFormInputs): void
}

export const loginFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {

  const {
    handleSubmit,
    control,
    errors
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginFormSchema)
  })


  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Email Input */}
          <Grid item xs={12}>
            <Controller
              name='email'
              defaultValue=""
              control={control}
              render={({onBlur, onChange, value}) => (
                <TextField
                  variant="filled"
                  color="secondary"
                  label="Email*"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  fullWidth
                />
              )}
            />
          </Grid>
          {/* Password Input */}
          <Grid item xs={12}>
            <Controller
              name='password'
              defaultValue=""
              control={control}
              render={({onBlur, onChange, value}) => (
                <TextField
                  variant="filled"
                  color="secondary"
                  type="password"
                  label="Password*"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
        <Box margin="16px 0">
          <Typography
            variant="body1"
            gutterBottom
          >
            <Link component={RouterLink} to="/forgotpassword">
              Forgot Password?
            </Link>
          </Typography>
        </Box>
        <Box marginTop="16px">
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  )
}
