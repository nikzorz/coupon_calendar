import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer'
import {Box, createStyles, Theme} from "@material-ui/core";
import {MemoizedOfferCard, OFFER_CARD_HEIGHT, OFFER_CARD_WIDTH} from "./OfferCard";
import {FixedSizeGrid, GridChildComponentProps} from 'react-window'
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {chunk} from 'lodash'
import {Offer} from "../../../types/offers/offer";

const useStyles = makeStyles((theme: Theme) => createStyles({
  cardBox: {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, minmax(${OFFER_CARD_WIDTH}px, 1fr))`,
    gridAutoRows: "min-content",
    gridGap: theme.spacing(4),
    padding: theme.spacing(2),
    boxSizing: "border-box"
  }
}))

export interface OfferGridListProps {
  offers?: Offer[]
}

export const OfferGridList: React.FC<OfferGridListProps> = ({ offers }) => {

  const classes = useStyles();
  const theme = useTheme();

  if (!offers) {
    return null;
  }

  return (
    <AutoSizer>
      {({ height, width }) => {

        // account for scrollbar
        const windowWidth = width - 30;

        // account for some padding on either side of the card
        const cardWidth = OFFER_CARD_WIDTH + (theme.spacing(2) * 2);
        const columnCount = Math.floor(width / cardWidth);

        const itemData = chunk(offers, columnCount);

        const columnWidth = Math.floor(windowWidth / columnCount);
        const rowCount = itemData.length
        // add padding to each row
        const rowHeight = OFFER_CARD_HEIGHT + theme.spacing(2);

        return (
          <FixedSizeGrid
            itemData={itemData}
            height={height}
            width={width}
            columnCount={columnCount}
            columnWidth={columnWidth}
            rowCount={rowCount}
            rowHeight={rowHeight}
          >
            {({ columnIndex, rowIndex, style, data }) => {
              const offer: Offer =  data[rowIndex][columnIndex];

              return (
                <div style={style}>
                  <Box display="flex" justifyContent="center">
                    <MemoizedOfferCard offer={offer} />
                  </Box>
                </div>
              )
            }}
          </FixedSizeGrid>
        )
      }}
    </AutoSizer>
  )
}