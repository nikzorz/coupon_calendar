import React, {useMemo} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Link as RouterLink} from 'react-router-dom';
import {LeftAside, MainSection, RightAside, ThreeColumnContainer} from "../../Layouts/ThreeColumnLayout";
import {
  Box,
  Button,
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
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from '@material-ui/icons/Search';
import {OfferGridList} from "../../Common/Offers/OfferGridList";
import {offerTemplateTypeOptions} from "../../../constants/offerConstants";
import {useMarkets} from "../../../hooks/markets/use-markets";
import {useOfferLibraries} from "../../../hooks/offers/use-offerLibrary";
import {useOffers} from "../../../hooks/offers/use-offers";
import {APIStatuses} from "../../../hooks/api/use-api";

const useStyles = makeStyles((theme: Theme) => createStyles({
  coopButton: {
    justifyContent: 'start'
  },
  loader: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const mockData = Array.apply(null, Array(100)).map(() => '1');

export const OfferIndexPage: React.FC = () => {
  const classes = useStyles();

  const markets = useMarkets();
  const offerLibraries = useOfferLibraries();

  const currentLibrary = offerLibraries.offerLibraries?.find((library) => library.marketId === markets.currentMarket);

  const memoizedOfferIds = useMemo<number[]>(() => {
    const offerIds: number[] = [];
    if (currentLibrary?.offerIds) {
      offerIds.push(...currentLibrary.offerIds)
    }
    if (currentLibrary?.inactiveOfferIds) {
      offerIds.push(...currentLibrary.inactiveOfferIds)
    }
    return offerIds;
  }, [currentLibrary])

  const offers = useOffers(memoizedOfferIds);

  const pageReady = [
    markets.apiStatus,
    offerLibraries.apiStatus,
    offers.apiStatus,
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
        <Button
          className={classes.coopButton}
          variant="text"
          fullWidth={true}
          size="large"
          color="primary"
          startIcon={<MenuIcon />}
        >
          Demo Co-Op
        </Button>
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
              offers={offers.offers}
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
        </List>
      </RightAside>
    </ThreeColumnContainer>
  )
}