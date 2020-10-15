import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import { Link as RouterLink } from 'react-router-dom';
import {LeftAside, MainSection, RightAside, ThreeColumnContainer} from "../../Layouts/ThreeColumnLayout";
import {Box, Button, IconButton, List, ListItem, Toolbar, Tooltip, Typography} from "@material-ui/core";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import MenuIcon from "@material-ui/icons/Menu";
import {getCurrentDate} from "../../../services/datetimeHelpers";
import {DatePicker} from "@material-ui/pickers";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles((theme: Theme) => createStyles({
  coopButton: {
    justifyContent: 'start'
  }
}))

export const SchedulesIndexPage: React.FC = () => {
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
              variant="h6"
              component="h1"
            >

            </Typography>
          </Box>
        </Toolbar>
        <div>

        </div>
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