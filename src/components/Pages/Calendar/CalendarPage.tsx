import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {ThreeColumnLayoutContainer} from "../../Layouts/ThreeColumnLayout";
import {DatePicker} from "@material-ui/pickers";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {CalendarMonthView} from "./CalendarMonthView/CalendarMonthView";
import {Box, Button, IconButton, List, ListItem, Toolbar, Tooltip, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {getCurrentDate} from "../../../services/datetimeHelpers";
import {format} from "date-fns";
import {CalendarWeekView} from "./CalendarWeekView/CalendarWeekView";

const useStyles = makeStyles((theme: Theme) => createStyles({
  leftAside: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 0,
    overflow: 'auto'
  },
  mainSection: {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto 1fr',
    overflow: 'auto'
  },
  rightAside: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 0,
  },
  grow: {
    flexGrow: 1
  },
  coopButton: {
    justifyContent: 'start'
  }
}));

export const CalendarPage: React.FC = () => {
  const classes = useStyles();
  const [date, changeDate] = useState(new Date());

  const currentDate = getCurrentDate();

  return (
    <ThreeColumnLayoutContainer>
      <aside className={classes.leftAside}>
        <div>
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
        </div>
        <div>
          <DatePicker
            autoOk
            disableToolbar
            orientation="landscape"
            variant="static"
            openTo="date"
            value={date}
            onChange={(date) => date && changeDate(date)}
          />
        </div>
      </aside>
      <section className={classes.mainSection}>
        <Toolbar>
          <IconButton
            aria-label="Change to previous month"
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            aria-label="Change to next month"
          >
            <ChevronRightIcon />
          </IconButton>
          <Box flexGrow="1">
            <Typography
              variant="h6"
            >
              {format(currentDate, 'LLLL, yyyy')}
            </Typography>
          </Box>
        </Toolbar>
        {/*<CalendarMonthView />*/}
        <CalendarWeekView />
      </section>
      <aside className={classes.rightAside}>
        <List
          dense
        >
          <ListItem>
            <Tooltip
              placement="left"
              title="Create a new Campaign"
              arrow
            >
              <IconButton
                edge="start"
                component={RouterLink}
                to="/"
              >
                <PlaylistAddIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        </List>
      </aside>
    </ThreeColumnLayoutContainer>
  )
}