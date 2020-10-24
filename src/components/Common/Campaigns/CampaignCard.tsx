import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Card, CardActionArea, CardMedia, Typography} from "@material-ui/core";

export const CAMPAIGN_CARD_HEIGHT = 55;

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    height: `${CAMPAIGN_CARD_HEIGHT}px`,
    width: '100%'
  },
  actionArea: {
    display: 'flex',
  },
  details: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: '1 1 auto',
    paddingLeft: theme.spacing(1),
  },
  mediaContainer: {
    width: '80px',
    height: '100%',
  },
  media: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  },
}));

export const CampaignCard: React.FC = () => {

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        <div className={classes.mediaContainer}>
          <CardMedia
            component="img"
            className={classes.media}
            image="https://s3.amazonaws.com/oce2-development/oce2-us-dev2/1ab689b0bf0e617d6772508545d410dd2daabb88.jpg"
          />
        </div>
        <div className={classes.details}>
          <Typography
            variant="subtitle1"
            component="h3"
            color="textPrimary"
          >
            SOME SPECIAL CAMPAIGN!!
          </Typography>
          <Typography
            variant="subtitle2"
            component="h4"
            color="textSecondary"
          >
            10/19/2020 12:00 am
          </Typography>
        </div>
      </CardActionArea>
    </Card>
  )
}

export const MemoizedCampaignCard = React.memo(CampaignCard)