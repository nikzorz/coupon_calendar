import React from 'react';
import {Button, createStyles, Menu, MenuItem, Theme, Tooltip} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {makeStyles} from "@material-ui/core/styles";
import {useMarkets} from "../../hooks/markets/use-markets";

const useStyles = makeStyles((theme: Theme) => createStyles({
  coopButton: {
    justifyContent: 'start'
  }
}))

export const NavMarketPicker: React.FC = () => {

  const classes = useStyles();

  const {
    currentMarket,
    userMarkets,
    setCurrentMarket
  } = useMarkets();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
          color="default"
          startIcon={<MenuIcon />}
          aria-controls="coop-nav-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {currentMarket?.marketName}
        </Button>
      </Tooltip>
      <Menu
        id="coop-nav-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        {userMarkets?.map((market) => (
          <MenuItem
            key={market.marketId}
            onClick={() => {
              setCurrentMarket(market.marketId);
              handleClose();
            }}
          >
            {market.marketName}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}