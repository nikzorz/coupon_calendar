import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link as RouterLink } from 'react-router-dom';
import {Controller, useForm} from "react-hook-form";
import {Box, Button, FormControl, FormHelperText, Grid, Input, InputLabel, TextField} from "@material-ui/core";

export interface CustomOfferFormInputs {
  title: string
  imageRequest: string
  pluRequest: string
}

export interface CustomOfferFormProps {
  onSubmit(values: CustomOfferFormInputs): void
}

export const customOfferFormSchema = yup.object().shape({
  title: yup.string().required('Offer Name is a required field'),
})

export const CustomOfferForm: React.FC<CustomOfferFormProps> = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    errors
  } = useForm<CustomOfferFormInputs>({
    resolver: yupResolver(customOfferFormSchema)
  })

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          {/* Title Input */}
          <Grid
            item
            xs={8}
          >
            <Controller
              name='title'
              defaultValue=""
              control={control}
              render={({onBlur, onChange, value}) => (
                <TextField
                  variant="filled"
                  label="Offer Name*"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid xs={4} />
          {/* Special Image Request TextArea */}
          <Grid
            item
            xs={8}
          >
            <Controller
              name='imageRequest'
              defaultValue=""
              control={control}
              render={({onBlur, onChange, value}) => (
                <TextField
                  variant="filled"
                  label="Special Image Request"
                  error={!!errors.imageRequest}
                  helperText={(
                    <>
                      <strong>OPTIONAL:</strong> Include relevant Images details here.
                    </>
                  )}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  fullWidth
                  rows={3}
                  multiline
                />
              )}
            />
          </Grid>
          <Grid xs={4} />
          {/* Special PLU/Offer Request TextArea */}
          <Grid
            item
            xs={8}
          >
            <Controller
              name='pluRequest'
              defaultValue=""
              control={control}
              render={({onBlur, onChange, value}) => (
                <TextField
                  variant="filled"
                  label="Special Image Request"
                  error={!!errors.pluRequest}
                  helperText={(
                    <>
                      <strong>OPTIONAL:</strong> Include additional important offer details here.  Ex. Specifics for offer title, subtitle or description fields, and/or menu item (PLU) exclusions/inclusions.
                    </>
                  )}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  fullWidth
                  rows={3}
                  multiline
                />
              )}
            />
          </Grid>
          <Grid xs={4} />
        </Grid>
        <Box
          display="flex"
          justifyContent="space-between"
          marginTop="40px"
        >
          <Button
            component={RouterLink}
            variant="outlined"
            to="/offers"
          >
            Cancel
          </Button>
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