import React from 'react'
import * as yup from 'yup'
import {useForm, Controller} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {Box, Button, Grid, Link, TextField} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {KeyboardDatePicker} from "@material-ui/pickers";

export interface ForgotPasswordFormInputs {
  email: string
}

export interface ForgotPasswordFormProps {
  onSubmit(values: ForgotPasswordFormInputs): void
}

export const forgotPasswordFormSchema = yup.object().shape({
  email: yup.string().email('Must be a valid email').required('Email is a required field')
})

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit }) => {

  const {
    handleSubmit,
    control,
    errors
  } = useForm<ForgotPasswordFormInputs>({
    resolver: yupResolver(forgotPasswordFormSchema)
  });

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="email"
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
        </Grid>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          marginTop="40px"
        >
          <Link
            component={RouterLink}
            to="/login"
          >
            Back to Login
          </Link>

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