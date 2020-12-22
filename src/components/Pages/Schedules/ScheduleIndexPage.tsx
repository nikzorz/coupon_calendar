import React, {useMemo} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Link as RouterLink} from 'react-router-dom';
import {groupBy} from 'lodash';
import {LeftAside, MainSection, RightAside, ThreeColumnContainer} from "../../Layouts/ThreeColumnLayout";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  Toolbar,
  Tooltip,
  Typography
} from "@material-ui/core";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {DatePicker} from "@material-ui/pickers";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {scheduleWorkflowInfo,} from "../../../constants/scheduleConstants";
import {MemoizedListItemLink} from "../../Common/ListItemLink";
import {NavMarketPicker} from "../../Common/NavMarketPicker";
import {useCalendar} from "../../../hooks/calendar/use-calendar";
import {useMarkets} from "../../../hooks/markets/use-markets";
import {useListSchedules} from "../../../hooks/schedules/use-list-schedules";
import {APIStatuses} from "../../../hooks/api/use-api";
import {Schedule} from "../../../types/schedules/schedules";

const mockData = Array.apply(null, Array(100));

const useStyles = makeStyles((theme: Theme) => createStyles({
  coopButton: {
    justifyContent: 'start'
  },
  content: {
    height: '100%',
    overflow: 'auto',
  },
  scheduleColumnContainer: {
    height: '100%',
    width: `100%`,
    overflow: 'auto',
    margin: 0
  },
  scheduleColumn: {
    height: '100%',
    overflow: 'auto',
  },
  scheduleColumnContent: {
    height: '100%',
    overflow: 'auto',
  },
  noSchedulesCopy: {
    paddingLeft: theme.spacing(2)
  }
}))

export const ScheduleIndexPage: React.FC = () => {
  const classes = useStyles();

  const {
    marketIdToMarketNameMap,
    userMarketIds,
    apiStatus: marketsApiStatus
  } = useMarkets();

  const {
    activeDate,
    setActiveDate
  } = useCalendar();

  const {
    schedules,
    apiStatus: schedulesApiStatus
  } = useListSchedules(activeDate, activeDate, userMarketIds);

  const pageReady = [
    marketsApiStatus,
    schedulesApiStatus
  ].every((status) => status === APIStatuses.VALID);

  const currentSchedule = schedules && schedules[0];

  const memoizedSchedulesByStatus = useMemo(() => {
    return currentSchedule ? groupBy(currentSchedule.marketSchedules, 'workflowStatus') : {};
  },[currentSchedule]);

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
            onChange={(date) => date && setActiveDate(date)}
          />
        </div>
      </LeftAside>
      <MainSection>
        <Toolbar>
          <Tooltip
            title="Change to previous Schedule"
            arrow
          >
            <IconButton
              aria-label="Change to previous schedule"
            >
              <ChevronLeftIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Change to next Schedule"
            arrow
          >
            <IconButton
              aria-label="Change to next schedule"
            >
              <ChevronRightIcon />
            </IconButton>
          </Tooltip>
          <Box flexGrow="1">
            <Typography
              variant="h4"
              component="h1"
            >
              {currentSchedule?.title}
              <Typography variant="subtitle1">
                {currentSchedule?.startDate} - {currentSchedule?.endDate}
              </Typography>
            </Typography>
          </Box>
        </Toolbar>
        <Box className={classes.content}>
          <Grid
            className={classes.scheduleColumnContainer}
            spacing={2}
            container
          >
            {!pageReady && (
              <Grid item>
                <CircularProgress />
              </Grid>
            )}
            {pageReady && scheduleWorkflowInfo.map((workflowKeyInfo) => (
              <Grid
                key={workflowKeyInfo.value}
                className={classes.scheduleColumn}
                direction="column"
                item
                container
                xs
              >
                <Grid item>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                  >
                    {workflowKeyInfo.label}
                  </Typography>
                </Grid>
                <Grid
                  className={classes.scheduleColumnContent}
                  item
                  xs
                >
                  <Paper>
                    <List>
                      {!memoizedSchedulesByStatus[workflowKeyInfo.value] && (
                        <Typography
                          className={classes.noSchedulesCopy}
                          variant='h6'
                          component="h3"
                          color="textSecondary"
                          paragraph
                        >
                          No {workflowKeyInfo.label} Schedules to Display
                        </Typography>
                      )}
                      {memoizedSchedulesByStatus[workflowKeyInfo.value]?.map((schedule, i) => (
                        <>
                          { i > 0 ? <Divider /> : null}
                          <MemoizedListItemLink
                            to={`/schedules/${schedule.marketId}`}
                            primary={marketIdToMarketNameMap ? marketIdToMarketNameMap[schedule.marketId] : ''}
                          />
                        </>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </MainSection>
      <RightAside>
        <List dense>
          <ListItem>
            <Tooltip
              placement="left"
              title="Create Schedule"
              arrow
            >
              <IconButton
                edge="start"
                component={RouterLink}
                to="/schedules/create"
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