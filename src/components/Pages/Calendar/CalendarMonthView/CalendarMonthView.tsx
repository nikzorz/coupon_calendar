import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {getDaysInMonth, getISODay, startOfMonth} from "date-fns";
import {CalendarMonthViewDay} from "./CalendarMonthViewDay";
import {getCurrentDate} from "../../../../helpers/datetimeHelpers";


const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'grid',
    overflow: 'auto',
    width: '100%',
    height: '100%',
    gridTemplateColumns: 'repeat(7, 1fr)',
  },
}))

export const CalendarMonthView: React.FC = () => {

  const classes = useStyles();

  const currentDate = getCurrentDate();
  const firstDayOfMonthOffset = 7 - getISODay(startOfMonth(currentDate));

  const numDays = firstDayOfMonthOffset + getDaysInMonth(currentDate);
  // initialize an array with numDays length
  const daysArray = Array.from({length: numDays}, (_, index) => index)

  return (
    <div className={classes.container}>
      {
        daysArray.map((_, dayIndex) => {
          const dayOffset = dayIndex - firstDayOfMonthOffset;
          const isOffsetDay = (dayOffset < 0);

          return (isOffsetDay) ? (
            <div key={dayIndex}/>
          ) : (
            <CalendarMonthViewDay
              dayNumber={dayOffset + 1}
              key={dayIndex}
            />
          )
        })
      }
    </div>
  )
}
