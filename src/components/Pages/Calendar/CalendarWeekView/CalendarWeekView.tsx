import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'grid',
    overflow: 'auto',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  weekColumns: {
    display: 'grid',
    width: '100%',
    height: '100%',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridColumnStart: 1,
    gridColumnGap: '1px',
    overflowY: 'auto',
  },
  weekColumn: {
    borderRight: `1px solid ${theme.palette.text.secondary}`,
    '&:last-child': {
      border: 'none',
    }
  },
  campaignRowsWrapper: {
    borderTop: `1px solid ${theme.palette.text.secondary}`,
    height: 'auto',
    gridColumnStart: '1',
    gridRowStart: '1',
    gridColumnGap: '1px',
    gridRowGap: '6px',
    display: 'grid',
    gridAutoColumns: '52px',
    gridTemplateColumns: 'repeat(7, minmax(0, 1fr)) 0',
    gridAutoFlow: 'dense',
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'auto'
  }
}))

export const CalendarWeekView: React.FC = () => {

  const classes = useStyles();

  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return (
    <div className={classes.container}>
      <div className={classes.weekColumns}>
        {weekDays.map((weekDay) => (
          <div
            className={classes.weekColumn}
            key={weekDay}
          >
            {weekDay}
          </div>
        ))}
      </div>
      <div className={classes.campaignRowsWrapper}>

      </div>
    </div>
  )
}