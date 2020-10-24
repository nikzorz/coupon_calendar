import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {CalendarIndexPage} from "../Pages/Calendar/CalendarIndexPage";
import {OfferIndexPage} from "../Pages/Offers/OfferIndexPage";
import {LoginPage} from "../Pages/User/LoginPage";
import {UnauthenticatedRoute} from "./UnauthenticatedRoute";
import {AuthenticatedRoute} from "./AuthenticatedRoute";
import {Navbar} from "./Navbar";
import {makeStyles} from "@material-ui/core/styles";
import {Box, CircularProgress, createStyles, Theme} from "@material-ui/core";
import {ScheduleIndexPage} from "../Pages/Schedules/ScheduleIndexPage";
import {ScheduleCreatePage} from "../Pages/Schedules/ScheduleCreatePage";
import {CustomOfferCreatePage} from "../Pages/Offers/CustomOfferCreatePage";
import {ScheduleViewPage} from "../Pages/Schedules/ScheduleViewPage";
import { useAuth} from "../../hooks/auth/use-auth";
import {APIStatuses} from "../../hooks/api/use-api";

const useStyles = makeStyles((theme: Theme) => createStyles({
  rootContainer: {
    display: 'grid',
    width: '100%',
    height: '100vh',
    overflow: 'auto',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '65px 1fr'
  },
  loader: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

export const Router: React.FC = () => {

  const classes = useStyles();

  const auth = useAuth();

  // wait for first call to verify account
  if (auth.apiStatus === APIStatuses.UNVERIFIED) {
    return (
      <Box className={classes.loader}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <CssBaseline />
      <div className={classes.rootContainer}>
        <Navbar />
        <Switch>
          {/* Unauthenticated Routes */}
          <UnauthenticatedRoute path="/login">
            <LoginPage />
          </UnauthenticatedRoute>

          {/* Authenticated Routes */}
          <AuthenticatedRoute path="/schedules/create">
            <ScheduleCreatePage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/schedules/:scheduleId" exact>
            <ScheduleViewPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/schedules">
            <ScheduleIndexPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/offers/custom/create">
            <CustomOfferCreatePage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/offers/manage">
            <OfferIndexPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/offers">
            <OfferIndexPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/">
            <CalendarIndexPage />
          </AuthenticatedRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}