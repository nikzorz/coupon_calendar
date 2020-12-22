import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {getDay, getDaysInMonth, getISODay, set, startOfMonth} from "date-fns";
import {CalendarMonthViewDay} from "./CalendarMonthViewDay";
import {CalendarViewTypes, useCalendar} from "../../../../hooks/calendar/use-calendar";


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
  const {
    activeDate,
    setCalendarViewType,
    setActiveDate,
  } = useCalendar();

  const firstDayOfMonthOffset = getISODay(startOfMonth(activeDate)) - 1;

  const numDays = firstDayOfMonthOffset + getDaysInMonth(activeDate);
  // initialize an array with numDays length
  const daysArray = Array.from({length: numDays}, (_, index) => index)

  return (
    <div className={classes.container}>
      {
        daysArray.map((_, dayIndex) => {
          const dayOffset = dayIndex - firstDayOfMonthOffset;
          const isOffsetDay = (dayOffset < 0);

          const dayDate = set(activeDate, { date: dayOffset+1});

          return (isOffsetDay) ? (
            <div key={dayDate.toISOString()}/>
          ) : (
            <CalendarMonthViewDay
              dayNumber={dayOffset + 1}
              key={dayDate.toISOString()}
              onClick={() => {
                setActiveDate(dayDate)
              }}
              onDoubleClick={() => {
                setCalendarViewType(CalendarViewTypes.week);
                setActiveDate(dayDate);
              }}
            />
          )
        })
      }
    </div>
  )
}
