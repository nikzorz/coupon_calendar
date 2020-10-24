import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import { Link as RouterLink } from 'react-router-dom';
import {LeftAside, MainSection, RightAside, ThreeColumnContainer} from "../../Layouts/ThreeColumnLayout";
import {
  Box,
  Button,
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
import MenuIcon from "@material-ui/icons/Menu";
import {getCurrentDate} from "../../../helpers/datetimeHelpers";
import {DatePicker} from "@material-ui/pickers";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  scheduleWorkflowInfo,
} from "../../../constants/scheduleConstants";
import {MemoizedListItemLink} from "../../Common/ListItemLink";

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
  }
}))

export const ScheduleIndexPage: React.FC = () => {
  const classes = useStyles();
  const [date, changeDate] = useState(new Date());

  const currentDate = getCurrentDate();

  return (
    <ThreeColumnContainer>
      <LeftAside>
        <div>
          <Tooltip
            title="Change Co-Op"
            placement="right"
            arrow
          >
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
          </Tooltip>
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
              dsfsdfsdf
            </Typography>
          </Box>
        </Toolbar>
        <Box className={classes.content}>
          <Grid
            className={classes.scheduleColumnContainer}
            spacing={2}
            container
          >
            {scheduleWorkflowInfo.map((workflowKeyInfo) => (
              <Grid
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
                      {mockData.map((_, i) => (
                        <>
                          { i > 0 ? <Divider /> : null}
                          <MemoizedListItemLink
                            to={`/schedules/${i}`}
                            primary={`Schedule ${i}`}
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