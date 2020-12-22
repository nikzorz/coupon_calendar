import React, {useState} from 'react'
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Chip, TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Offer} from "../../../types/offers/offer";

const useStyles = makeStyles((theme: Theme) => createStyles({

}))

export interface MultiOfferPickerInputProps {
  offerIds?: number[]
  value?: number[]
  onChange(offerIds?: number[]): void
}

export const MultiOfferPickerInput: React.FC<MultiOfferPickerInputProps> = ({offerIds, value, onChange}) => {

  return <div />

  // return (
  //   <Autocomplete
  //     multiple
  //     disableCloseOnSelect
  //     options={options}
  //     value={value}
  //     onChange={(event, newValue) => {
  //       onChange(newValue)
  //     }}
  //     getOptionLabel={(option) => (marketIdToMarketNameMap && marketIdToMarketNameMap[option]) || ''}
  //     renderTags={(tagValue, getTagProps) => {
  //       return tagValue.map((option, index) => (
  //         <Chip
  //           label={(marketIdToMarketNameMap && marketIdToMarketNameMap[option]) || ''}
  //           color="primary"
  //           {...getTagProps({ index})}
  //         />
  //       ))
  //     }}
  //     renderInput={(params) => (
  //       <TextField
  //         {...params}
  //         error={!!errors.marketIds}
  //         //@ts-ignore-next-line
  //         helperText={errors.marketIds?.message}
  //         color="secondary"
  //         label="Select Markets*"
  //         variant="filled"
  //       />
  //     )}
  //   />
  // )
}