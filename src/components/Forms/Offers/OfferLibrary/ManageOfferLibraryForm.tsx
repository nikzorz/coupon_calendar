import React, {useMemo} from 'react';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Chip, CircularProgress, Grid, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Controller, useForm} from "react-hook-form";
import {useMarkets} from "../../../../hooks/markets/use-markets";
import {APIStatuses} from "../../../../hooks/api/use-api";
import {Link as RouterLink} from "react-router-dom";
import {useOfferLibraries} from "../../../../hooks/offers/use-offerLibraries";
import {useActiveOffers} from "../../../../hooks/offers/use-active-offers";
import {useOffers} from "../../../../hooks/offers/use-offers";
import {OfferLibrary} from "../../../../types/offers/offerLibrary";

const intersect2 = (xs: number[], ys: number[]): number[] => {
  return xs.filter((x) => {
    return ys.some((y) => {
      return y === x;
    });
  });
};

const intersect = (zss: number[][]): number[] => {
  const xs = zss[0];
  const ys = zss[1];
  const rest = zss.slice(2);
  if (ys === undefined) {
    return xs;
  }
  return intersect([intersect2(xs, ys)].concat(rest));
};

export interface ManageOfferLibraryFormInputs {
  marketIds: number[],
  offerIds: number[],
}

export interface ManageOfferLibraryFormProps {
  onSubmit(values: ManageOfferLibraryFormInputs, offerLibraries: OfferLibrary[]): void
}

export const manageOfferLibraryFormSchema = yup.object().shape({
  marketIds: yup.array().of(
    yup.number().required()
  ).ensure().required('Market IDs required.'),
  offerIds: yup.array(yup.number()).required('Offer IDs required.'),
})

export const ManageOfferLibraryForm: React.FC<ManageOfferLibraryFormProps> = ({ onSubmit }) => {

  const {
    handleSubmit,
    control,
    errors,
    watch
  } = useForm<ManageOfferLibraryFormInputs>({
    resolver: yupResolver(manageOfferLibraryFormSchema)
  })

  const {
    apiStatus: marketsStatus,
    userMarkets,
    marketIdToMarketNameMap,
    currentMarket
  } = useMarkets();

  const defaultMarketIdsValue = useMemo<number[]>(() => {
    return currentMarket ? [currentMarket.marketId] : []
  }, [currentMarket])

  const selectedMarketIds = watch('marketIds', defaultMarketIdsValue)

  const userMarketIds = useMemo<number[]>(() => {
    return userMarkets ? userMarkets.map((market) => market.marketId) : []
  }, [userMarkets])

  const {
    apiStatus: offerLibrariesStatus,
    offerLibraries,
  } = useOfferLibraries(userMarketIds)

  const defaultOfferIds = offerLibraries?.find((offerLibrary) => offerLibrary.marketId === currentMarket?.marketId)?.offerIds || [];

  const {
    apiStatus: activeOffersStatus,
    activeOffers
  } = useActiveOffers();

  const activeOfferIds = useMemo<number[]>(() => {
    return activeOffers ? activeOffers.map((offer) => offer.offerId) : []
  }, [activeOffers])

  const {
    apiStatus: offersStatus,
    offers
  } = useOffers(activeOfferIds);

  const offerInputReady = [
    marketsStatus,
    offerLibrariesStatus,
    activeOffersStatus,
    offersStatus
  ].every((status) => status === APIStatuses.VALID)

  if ([APIStatuses.UNVERIFIED, APIStatuses.VERIFYING].includes(marketsStatus)) {
    return <CircularProgress />
  }

  const handleOnSubmit = (values: ManageOfferLibraryFormInputs) => {
    onSubmit(values, offerLibraries || [])
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Grid container spacing={4}>
          <Grid
            item
            xs={11}
          >
            <Controller
              name="marketIds"
              defaultValue={defaultMarketIdsValue}
              control={control}
              render={({onBlur, onChange, value}) => (
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  options={userMarketIds}
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue)
                  }}
                  getOptionLabel={(option) => (marketIdToMarketNameMap && marketIdToMarketNameMap[option]) || ''}
                  renderTags={(tagValue, getTagProps) => {
                    return tagValue.map((option, index) => (
                      <Chip
                        label={(marketIdToMarketNameMap && marketIdToMarketNameMap[option]) || ''}
                        color="primary"
                        {...getTagProps({ index})}
                      />
                    ))
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.marketIds}
                      //@ts-ignore-next-line
                      helperText={errors.marketIds?.message}
                      color="secondary"
                      label="Select Markets*"
                      variant="filled"
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={12} >
            {offerInputReady && (
              <Controller
                name="offerIds"
                defaultValue={defaultOfferIds}
                control={control}
                render={({onBlur, onChange, value}) => (
                  <Autocomplete
                    multiple
                    disableCloseOnSelect
                    options={activeOfferIds}
                    value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue)
                    }}
                    getOptionLabel={(offerId) => {
                      return `${offerId} - ${activeOffers?.find((offer) => offer.offerId === offerId)?.offerTitle}`
                    }}
                    renderTags={(tagValue, getTagProps) => {
                      return tagValue.map((offerId, index) => (
                        <Chip
                          label={`${offerId} - ${activeOffers?.find((offer) => offer.offerId === offerId)?.offerTitle}`}
                          color="primary"
                          {...getTagProps({ index})}
                        />
                      ))
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.offerIds}
                        //@ts-ignore-next-line
                        helperText={errors.offerIds?.message}
                        color="secondary"
                        label="Select Offers*"
                        variant="filled"
                      />
                    )}
                  />
                )}
              />
            )}
          </Grid>
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