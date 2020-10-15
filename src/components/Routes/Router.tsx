import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {CalendarIndexPage} from "../Pages/Calendar/CalendarIndexPage";
import {OfferIndexPage} from "../Pages/Offers/OfferIndexPage";
import {LoginPage} from "../Pages/User/LoginPage";
import {UnauthenticatedRoute} from "./UnauthenticatedRoute";
import {AuthenticatedRoute} from "./AuthenticatedRoute";
import {Navbar} from "./Navbar";
import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Theme} from "@material-ui/core";
import {SchedulesIndexPage} from "../Pages/Schedules/SchedulesIndexPage";
import {ScheduleCreatePage} from "../Pages/Schedules/ScheduleCreatePage";
import {CustomOfferCreatePage} from "../Pages/Offers/CustomOfferCreatePage";

const useStyles = makeStyles((theme: Theme) => createStyles({
  rootContainer: {
    display: 'grid',
    width: '100%',
    height: '100vh',
    overflow: 'auto',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '65px 1fr'
  }
}))

export const Router: React.FC = () => {

  const classes = useStyles();

  return (
    <BrowserRouter>
      <CssBaseline />
      <div className={classes.rootContainer}>
        <Navbar />
        <Switch>
          {/* Unauthenticated Routes */}
          <Route path="/login">
            <LoginPage />
          </Route>

          {/* Authenticated Routes */}
          <Route path="/schedules/create">
            <ScheduleCreatePage />
          </Route>
          <Route path="/schedules">
            <SchedulesIndexPage />
          </Route>
          <Route path="/offers/custom/create">
            <CustomOfferCreatePage />
          </Route>
          <Route path="/offers/manage">
            <OfferIndexPage />
          </Route>
          <Route path="/offers">
            <OfferIndexPage />
          </Route>
          <Route path="/">
            <CalendarIndexPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}