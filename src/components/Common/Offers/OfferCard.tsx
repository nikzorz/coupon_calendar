import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  Chip, createStyles, Theme, Typography,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Offer, OfferTemplateTypesDisplay} from "../../../types/offers/offer";

export const OFFER_CARD_HEIGHT = 75;
export const OFFER_CARD_WIDTH = 240;

// TODO Way too many hard coded pixel values here
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    height: `${OFFER_CARD_HEIGHT}px`,
    width: `${OFFER_CARD_WIDTH}px`
  },
  actionArea: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    width: '150px',
    height: '100%',
    flexDirection: 'column',
  },
  content: {
    flex: '1 1 auto',
    paddingLeft: theme.spacing(1)
  },
  info: {
    flex: '0 1 auto',
    height: '36px',
    display: 'grid',
    gridTemplateColumns: '60px 1fr'
  },
  offerId: {
    fontSize: '10px',
    fontWeight: 'bold',
    height: '100%',
    width: '100%',
    padding: '0',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundColor: 'rgb(255,195,0)'
  },
  offerType: {
    textAlign: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    height: '100%',
    width: 'calc(100% - 1px)',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: 'rgb(199, 199, 199)'
  },
  offerTitle: {
    width: '120px'
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
}))

export interface OfferCardProps {
  offer: Offer
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {

  const classes = useStyles();

  if (!offer) {
    return null;
  }

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        <div className={classes.mediaContainer}>
          <CardMedia
            component="img"
            className={classes.media}
            image={offer?.translations[0]?.imageName}
          />
        </div>
        <div className={classes.details}>
          <div className={classes.content}>
            <Typography
              className={classes.offerTitle}
              variant="subtitle1"
              title={offer.offerTitle}
              color="textPrimary"
              component="h2"
              noWrap
            >
              {offer.offerTitle}
            </Typography>
          </div>
          <div className={classes.info}>
            <div className={classes.offerId}>
              {offer.offerId}
            </div>
            <div className={classes.offerType}>
              {OfferTemplateTypesDisplay[offer.offerType]}
            </div>
          </div>
        </div>
      </CardActionArea>
    </Card>
  )
}

export const MemoizedOfferCard = React.memo(OfferCard)