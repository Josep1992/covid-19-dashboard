import * as Moment from 'moment';
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

type Formatter = "-" | "/";

const dateFormat = (date, formatter: Formatter = undefined): string => {
  const format:string = "MMM D h:mma";

  return moment(date).format(
    formatter ? format.replace(/\s/g,formatter): format
  );
}

const isEmpty = (obj: object): boolean => {
  if (typeof obj === "undefined" || obj === null) {
    return true;
  }
  return !Object.keys(obj).length
};


export {
  moment,
  isEmpty,
  dateFormat
}