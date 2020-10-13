import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {FormControl, InputLabel, Input, FormHelperText, Button, Link, Typography} from '@material-ui/core'
import { Link as RouterLink } from "react-router-dom";
import * as yup from "yup";

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormControl
            error={!!errors.email}
            margin="normal"
            fullWidth
          >
            <InputLabel htmlFor="loginForm-email">
              Email*
            </InputLabel>
            <Controller
              as={Input}
              id="loginForm-email"
              name="email"
              defaultValue=""
              aria-describedby="loginForm-email-help-text"
              aria-invalid={errors.email ? "true" : "false"}
              control={control}
            />
            <FormHelperText id="loginForm-email-help-text">
              {errors.email?.message}
            </FormHelperText>
          </FormControl>
        </div>

        <div>
          <FormControl
            error={!!errors.email}
            margin="normal"
            fullWidth
          >
            <InputLabel htmlFor="loginForm-email">
              Password*
            </InputLabel>
            <Controller
              as={Input}
              id="loginForm-password"
              name="password"
              type="password"
              defaultValue=""
              aria-describedby="loginForm-password-help-text"
              aria-invalid={errors.password ? "true" : "false"}
              control={control}
            />
            <FormHelperText id="loginForm-password-help-text">
              {errors.password?.message}
            </FormHelperText>
          </FormControl>
        </div>
        <Typography
          variant="body1"
          gutterBottom
        >
          <Link component={RouterLink} to="/forgotpassword">
            Forgot Password?
          </Link>
        </Typography>
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
