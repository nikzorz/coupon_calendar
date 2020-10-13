import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Box, Button, Paper} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    borderRadius: '0',
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto 1fr',
    overflow: 'auto'
  },
  wrapper: {
    overflowY: 'auto'
  },
  dateNumber: {
    paddingLeft: theme.spacing(1)
  }
}))

export interface CalendarMonthViewDayProps {
  dayNumber: number
}

export const CalendarMonthViewDay: React.FC<CalendarMonthViewDayProps> = ({ dayNumber }) => {

  const classes = useStyles();

  return (
    <Paper
      variant="outlined"
      className={classes.container}
    >
      <div>
        <Button>
          {dayNumber}
        </Button>
      </div>
      <Box className={classes.wrapper}>
        xfgdfg asdfasd fasdf asdf asdf asdf asdf
        xfgdfg asdfasd fasdf asdf asdf asdf asdf
        xfgdfg asdfasd fasdf asdf asdf asdf asdf
        xfgdfg asdfasd fasdf asdf asdf asdf asdf
        xfgdfg asdfasd fasdf asdf asdf asdf asdf
        xfgdfg asdfasd fasdf asdf asdf asdf asdf
        xfgdfg asdfasd fasdf asdf asdf asdf asdf
        xfgdfg asdfasd fasdf asdf asdf asdf asdf
        xfgdfg asdfasd fasdf asdf asdf asdf asdf
      </Box>
    </Paper>
  )
}
