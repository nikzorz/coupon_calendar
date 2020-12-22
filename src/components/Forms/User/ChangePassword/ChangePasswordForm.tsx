import React from 'react'
import * as yup from 'yup'
import {useForm, Controller} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {Box, Button, Grid, TextField} from "@material-ui/core";
import {KeyboardDatePicker} from "@material-ui/pickers";

export interface ChangePasswordFormInputs {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ChangePasswordFormProps {
  onSubmit(values: ChangePasswordFormInputs): void
}

export const changePasswordFormSchema = yup.object().shape({
  currentPassword: yup.string().required('Current Password is a required field'),
  newPassword: yup.string().required('New Password is a required field'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Confirm Password does not match New Password')
    .required('Confirm New Password is a required field')
})

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onSubmit }) => {

  const {
    handleSubmit,
    control,
    errors
  } = useForm<ChangePasswordFormInputs>({
    resolver: yupResolver(changePasswordFormSchema)
  })

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="currentPassword"
              defaultValue=""
              control={control}
              render={({onBlur, onChange, value}) => (
                <TextField
                  type="password"
                  variant="filled"
                  color="secondary"
                  label="Current Password*"
                  error={!!errors.currentPassword}
                  helperText={errors.currentPassword?.message}
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
          justifyContent="flex-end"
          marginTop="40px"
        >
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