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
import {ChangePasswordPage} from "../Pages/User/ChangePasswordPage";
import {ForgotPasswordPage} from "../Pages/User/ForgotPasswordPage";
import {ResetPasswordPage} from "../Pages/User/ResetPasswordPage";
import {ManageOfferLibraryPage} from "../Pages/Offers/ManageOfferLibraryPage";

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
  if ([APIStatuses.UNVERIFIED, APIStatuses.VERIFYING].includes(auth.apiStatus)) {
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
          <UnauthenticatedRoute path="/forgotpassword">
            <ForgotPasswordPage />
          </UnauthenticatedRoute>
          <UnauthenticatedRoute path="/resetpassword">
            <ResetPasswordPage />
          </UnauthenticatedRoute>

          {/* Authenticated Routes */}

          {/* User */}
          <AuthenticatedRoute path="/changepassword">
            <ChangePasswordPage />
          </AuthenticatedRoute>

          {/* Schedules */}
          <AuthenticatedRoute path="/schedules/create">
            <ScheduleCreatePage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/schedules/:scheduleId" exact>
            <ScheduleViewPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/schedules">
            <ScheduleIndexPage />
          </AuthenticatedRoute>

          {/* Offers */}
          <AuthenticatedRoute path="/offers/custom/create">
            <CustomOfferCreatePage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/offers/manage">
            <ManageOfferLibraryPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/offers">
            <OfferIndexPage />
          </AuthenticatedRoute>

          {/* Calendar */}
          <AuthenticatedRoute path="/">
            <CalendarIndexPage />
          </AuthenticatedRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}