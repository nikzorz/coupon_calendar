import React, {useMemo} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {LeftAside, MainSection, RightAside, ThreeColumnContainer} from "../../Layouts/ThreeColumnLayout";
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import GridOnIcon from '@material-ui/icons/GridOn';
import SearchIcon from '@material-ui/icons/Search';
import {OfferGridList} from "../../Common/Offers/OfferGridList";
import {offerTemplateTypeOptions} from "../../../constants/offerConstants";
import {useMarkets} from "../../../hooks/markets/use-markets";
import {useOfferLibrary} from "../../../hooks/offers/use-offerLibrary";
import {useOffers} from "../../../hooks/offers/use-offers";
import {APIStatuses} from "../../../hooks/api/use-api";
import {NavMarketPicker} from "../../Common/NavMarketPicker";

export const OfferIndexPage: React.FC = () => {
  const {
    currentMarket,
    apiStatus: marketsStatus
  } = useMarkets();
  const {
    offerLibrary,
    apiStatus: offerLibraryStatus
  } = useOfferLibrary(currentMarket?.marketId);

  const memoizedOfferIds = useMemo<number[]>(() => {
    const offerIds: number[] = [];
    if (offerLibrary?.offerIds) {
      offerIds.push(...offerLibrary.offerIds)
    }
    if (offerLibrary?.inactiveOfferIds) {
      offerIds.push(...offerLibrary.inactiveOfferIds)
    }
    return offerIds;
  }, [offerLibrary])

  const {
    offers,
    apiStatus: offersStatus
  } = useOffers(memoizedOfferIds);

  const pageReady = [
    marketsStatus,
    offerLibraryStatus,
    offersStatus,
  ].every((status) => status === APIStatuses.VALID);

  const [offerTemplateFilterState, setOfferTemplateFilterState] = React.useState(offerTemplateTypeOptions.reduce(
    (acc: any, offerTemplateOption) => {
      acc[offerTemplateOption.label] = false;
      return acc;
    }, {} ))

  const handleChangeOfferTemplateFilterState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOfferTemplateFilterState({
      ...offerTemplateFilterState,
      [event.target.name]: event.target.checked,
    })
  }

  return (
    <ThreeColumnContainer>
      <LeftAside>
        <NavMarketPicker />
        <Box paddingLeft="30px" marginTop="16px">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Offer Templates
            </FormLabel>
            <FormGroup>
              {offerTemplateTypeOptions.map((offerTemplateOption) => (
                <FormControlLabel
                  key={offerTemplateOption.label}
                  label={offerTemplateOption.label}
                  control={
                    <Checkbox
                      checked={offerTemplateFilterState[offerTemplateOption.label]}
                      onChange={handleChangeOfferTemplateFilterState}
                      name={offerTemplateOption.label}
                    />
                  }
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      </LeftAside>
      <MainSection>
        <Toolbar>
          <Box flexGrow="1">
            <Typography variant="h4" component="h1">
              Offer Library
            </Typography>
          </Box>
          <Box>
            <TextField
              label="Search by Offer Title or ID"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </Toolbar>
        <Box overflow="auto">
          {pageReady ? (
            <OfferGridList
              offers={offers}
            />
          ) : (
            <CircularProgress />
          )}
        </Box>
      </MainSection>
      <RightAside>
        <List dense>
          <ListItem>
            <Tooltip
              placement="left"
              title="Create Custom Offer"
              arrow
            >
              <IconButton
                edge="start"
                component={RouterLink}
                to="/offers/custom/create"
              >
                <PlaylistAddIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem>
            <Tooltip
              placement="left"
              title="Manage Offer Libraries"
              arrow
            >
              <IconButton
                edge="start"
                component={RouterLink}
                to="/offers/manage"
              >
                <GridOnIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        </List>
      </RightAside>
    </ThreeColumnContainer>
  )
}