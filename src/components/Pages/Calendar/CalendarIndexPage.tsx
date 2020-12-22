import React, {useMemo} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {LeftAside, MainSection, RightAside, ThreeColumnContainer} from "../../Layouts/ThreeColumnLayout";
import {DatePicker} from "@material-ui/pickers";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Select,
  Toolbar,
  Tooltip,
  Typography
} from "@material-ui/core";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {endOfDay, format, lastDayOfMonth, startOfDay, startOfMonth} from "date-fns";
import {CalendarWeekView} from "./CalendarWeekView/CalendarWeekView";
import {CalendarMonthView} from "./CalendarMonthView/CalendarMonthView";
import {CalendarViewTypes, useCalendar} from "../../../hooks/calendar/use-calendar";
import {NavMarketPicker} from "../../Common/NavMarketPicker";
import {useMarkets} from "../../../hooks/markets/use-markets";
import {useCampaigns} from "../../../hooks/campaigns/use-campaigns";
import {APIStatuses} from "../../../hooks/api/use-api";
import {useSchedule} from "../../../hooks/schedules/use-schedule";
import {useConfig} from "../../../hooks/config/use-config";
import {utcToZonedTime, zonedTimeToUtc} from "date-fns-tz";

const useStyles = makeStyles((theme: Theme) => createStyles({
  grow: {
    flexGrow: 1
  },
  coopButton: {
    justifyContent: 'start'
  }
}));

export const CalendarIndexPage: React.FC = () => {
  const {
    timezone
  } = useConfig();
  const {
    currentMarket,
    apiStatus: marketsApiStatus
  } = useMarkets();
  const {
    calendarViewType,
    setCalendarViewType,
    activeDate,
    setActiveDate
  } = useCalendar();

  const startDate = zonedTimeToUtc(startOfDay(startOfMonth(activeDate)), timezone);
  const endDate = zonedTimeToUtc(endOfDay(lastDayOfMonth(activeDate)), timezone);

  const {
    schedule,
    apiStatus: scheduleApiStatus
  } = useSchedule(startDate, endDate, currentMarket?.marketId);

  const {
    campaigns,
    apiStatus: campaignsApiStatus
  } = useCampaigns(startDate, endDate, currentMarket?.marketId);

  const handleChangeCalendarViewType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCalendarViewType(Number(event.target.value));
  };


  const pageReady = [
    marketsApiStatus,
    scheduleApiStatus,
    campaignsApiStatus
  ].some((status) => status === APIStatuses.VALID)

  return (
    <ThreeColumnContainer>
      <LeftAside>
        <NavMarketPicker />
        <div>
          <DatePicker
            autoOk
            disableToolbar
            orientation="landscape"
            variant="static"
            openTo="date"
            value={activeDate}
            onChange={(date) => {
              if (date) {
                setActiveDate(date)
              }
            }}
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
              variant="h4"
              component="h1"
            >
              {format(activeDate, 'LLLL, yyyy')}
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
        {(!pageReady) && (
          <CircularProgress />
        )}
        {pageReady && (calendarViewType === CalendarViewTypes.month) && (
          <CalendarMonthView />
        )}
        {pageReady && (calendarViewType === CalendarViewTypes.week) && (
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