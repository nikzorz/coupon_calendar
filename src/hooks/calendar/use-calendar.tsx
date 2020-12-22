import React, {createContext, useContext, useState} from 'react';
import {useConfig} from "../config/use-config";
import {utcToZonedTime} from "date-fns-tz";

export enum CalendarViewTypes {
  month,
  week,
  day
}

export interface UseCalendarContextType {
  calendarViewType: CalendarViewTypes
  setCalendarViewType(newViewType: CalendarViewTypes): void
  activeDate: Date
  setActiveDate(newDate: Date): void
}

const calendarContext = createContext<UseCalendarContextType>({
  calendarViewType: CalendarViewTypes.month,
  setCalendarViewType: () => {},
  activeDate: new Date(),
  setActiveDate: () => {},
});

export const ProvideCalendar: React.FC = ({children}) => {
  const calendar = useProvideCalendar();

  return (
    <calendarContext.Provider value={calendar}>
      {children}
    </calendarContext.Provider>
  )
}

export const useCalendar = () => {
  return useContext(calendarContext);
}

export const useProvideCalendar = ():UseCalendarContextType => {
  const { timezone } = useConfig()
  const [activeDate, setActiveDate] = useState<Date>(utcToZonedTime(new Date(), timezone));
  const [calendarViewType, setCalendarViewType] = useState<CalendarViewTypes>(CalendarViewTypes.month);

  return {
    calendarViewType,
    activeDate,
    setActiveDate,
    setCalendarViewType
  }
}