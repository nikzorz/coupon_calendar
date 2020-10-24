import React, {useState} from 'react';
import {LeftAside, MainSection, RightAside, ThreeColumnContainer} from "../../Layouts/ThreeColumnLayout";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Box, Button, Divider, Grid, IconButton, List, ListItem, Toolbar, Tooltip, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {DatePicker} from "@material-ui/pickers";
import { Link as RouterLink } from 'react-router-dom';
import EventIcon from '@material-ui/icons/Event';
import {MemoizedCampaignCard} from "../../Common/Campaigns/CampaignCard";

const useStyles = makeStyles((theme: Theme) => createStyles({
  coopButton: {
    justifyContent: 'start',
  },
  content: {
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  campaignGroupTitle: {
    flex: '0 1 auto',
    padding: `${theme.spacing(2)}px 0`
  },
  campaignGroup: {
    flex: '1 1 auto',
    overflow: 'auto',
  },
}))

export const ScheduleViewPage: React.FC = () => {
  const classes = useStyles();

  const [date, changeDate] = useState(new Date());

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
          <Box flexGrow="1">
            <Typography
              variant="h4"
              component="h1"
            >
              aspodfkpasodkf
            </Typography>
          </Box>
        </Toolbar>
        <div className={classes.content}>
          <div className={classes.campaignGroupTitle}>
            <Typography
              component="h2"
              variant="h6"
            >
              National Offers
            </Typography>
          </div>
          <div className={classes.campaignGroup}>
            <List dense>
              {Array.apply(null, Array(100)).map((_, i) => (
                <ListItem key={i}>
                  <MemoizedCampaignCard />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.campaignGroupTitle}>
            <Typography
              component="h2"
              variant="h6"
            >
              Local Offers
            </Typography>
          </div>
          <div className={classes.campaignGroup}>
            <List dense>
              {Array.apply(null, Array(100)).map((_, i) => (
                <ListItem key={i}>
                  <MemoizedCampaignCard />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </MainSection>
      <RightAside>
        <List dense>
          <ListItem>
            <Tooltip
              placement="left"
              title="Create Campaign"
              arrow
            >
              <IconButton
                edge="start"
                component={RouterLink}
                to="/campaigns/create"
              >
                <EventIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        </List>
      </RightAside>
    </ThreeColumnContainer>
  )
}