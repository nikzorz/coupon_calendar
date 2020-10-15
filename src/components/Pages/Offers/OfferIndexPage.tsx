import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import { Link as RouterLink } from 'react-router-dom';
import {LeftAside, MainSection, RightAside, ThreeColumnContainer} from "../../Layouts/ThreeColumnLayout";
import {Box, Button, IconButton, List, ListItem, Toolbar, Tooltip, Typography} from "@material-ui/core";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme: Theme) => createStyles({
  coopButton: {
    justifyContent: 'start'
  }
}))

export const OfferIndexPage: React.FC = () => {
  const classes = useStyles();

  return (
    <ThreeColumnContainer>
      <LeftAside>
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
      </LeftAside>
      <MainSection>
        <Toolbar>
          <Box flexGrow="1">
            <Typography
              variant="h6"
              component="h1"
            >
              Offer Library
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
              title="Create Custom Offer"
              arrow
            >
              <IconButton
                edge="start"
                component={RouterLink}
                to="/offers/custom/create"
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