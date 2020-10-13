import { convertToTimeZone} from "date-fns-timezone";
import { format } from 'date-fns'

export const getCurrentDate = () => convertToTimeZone(new Date(), { timeZone: 'America/New_York'});

export const formatDate = (date: Date) => format(date, 'MM/DD/yyyy');