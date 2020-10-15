import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {LeftAside, MainSection, RightAside, ThreeColumnContainer} from "../../Layouts/ThreeColumnLayout";
import {DatePicker} from "@material-ui/pickers";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Select,
  Toolbar,
  Tooltip,
  Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {getCurrentDate} from "../../../services/datetimeHelpers";
import {format} from "date-fns";
import {CalendarWeekView} from "./CalendarWeekView/CalendarWeekView";
import {CalendarViewTypes} from "../../../constants/calendarConstants";
import {CalendarMonthView} from "./CalendarMonthView/CalendarMonthView";

const useStyles = makeStyles((theme: Theme) => createStyles({
  grow: {
    flexGrow: 1
  },
  coopButton: {
    justifyContent: 'start'
  }
}));

export const CalendarIndexPage: React.FC = () => {
  const classes = useStyles();
  const [date, changeDate] = useState(new Date());
  const [calendarViewType, changeCalendarViewType] = useState(CalendarViewTypes.month);
  const handleChangeCalendarViewType = (event: React.ChangeEvent<{ value: unknown }>) => {
    changeCalendarViewType(Number(event.target.value));
  };

  const currentDate = getCurrentDate();

  return (
    <ThreeColumnContainer>
      <LeftAside>
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
      </LeftAside>
      <MainSection>
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
              component="h1"
            >
              {format(currentDate, 'LLLL, yyyy')}
            </Typography>
          </Box>
          <Box>
            <Select
              value={calendarViewType}
              onChange={handleChangeCalendarViewType}
              displayEmpty
            >
              <MenuItem value={CalendarViewTypes.month}>
                Month
              </MenuItem>
              <MenuItem value={CalendarViewTypes.week}>
                Week
              </MenuItem>
              <MenuItem value={CalendarViewTypes.day}>
                Day
              </MenuItem>
            </Select>
          </Box>
        </Toolbar>
        {(calendarViewType === CalendarViewTypes.month) && (
          <CalendarMonthView />
        )}
        {(calendarViewType === CalendarViewTypes.week) && (
          <CalendarWeekView />
        )}
      </MainSection>
      <RightAside>
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
      </RightAside>
    </ThreeColumnContainer>
  )
}