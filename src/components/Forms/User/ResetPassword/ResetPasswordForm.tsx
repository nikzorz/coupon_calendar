import React from 'react'
import * as yup from 'yup'
import {useForm, Controller} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {Box, Button, Grid, Link, TextField} from "@material-ui/core";
import {useQuery} from "../../../../hooks/router/use-query";
import {Link as RouterLink} from "react-router-dom";
import {KeyboardDatePicker} from "@material-ui/pickers";

export interface ResetPasswordFormInputs {
  newPassword: string
  confirmPassword: string
}

export interface ResetPasswordFormProps {
  onSubmit(values: ResetPasswordFormInputs): void
}

export const resetPasswordFormSchema = yup.object().shape({
  token: yup.string().required('Password validation Token is required'),
  newPassword: yup.string().required('New Password is a required field'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Confirm Password does not match New Password')
    .required('Confirm New Password is a required field')
})

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit }) => {

  const {
    handleSubmit,
    register,
    control,
    errors
  } = useForm<ResetPasswordFormInputs>({
    resolver: yupResolver(resetPasswordFormSchema)
  })

  // Get token from query params
  const query = useQuery();
  const token = query.get('token') || '';

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="hidden"
          name="token"
          defaultValue={token}
          ref={register}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="newPassword"
              defaultValue=""
              control={control}
              render={({onBlur, onChange, value}) => (
                <TextField
                  type="password"
                  variant="filled"
                  color="secondary"
                  label="New Password*"
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="confirmPassword"
              defaultValue=""
              control={control}
              render={({onBlur, onChange, value}) => (
                <TextField
                  type="password"
                  variant="filled"
                  color="secondary"
                  label="Confirm New Password*"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
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