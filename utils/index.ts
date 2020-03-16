import * as Moment from 'moment';
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

type Formatter = "-" | "/";

const dateFormat = (date, formatter: Formatter = undefined): string => {
  const format: string = "MMM D h:mma";

  return moment(date).format(
    formatter ? format.replace(/\s/g, formatter) : format
  );
}

const isEmpty = (obj: object): boolean => {
  if (obj === undefined || obj === null) {
    return true;
  }
  return !Object.keys(obj).length
};

const setPersistentState = (key: string, value: any): void => {
  if (process.browser) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

const getPersistentState = (key: string): any => {
  if (process.browser) {
    return JSON.parse(window.localStorage.getItem(key));
  }
};

const getENV = (): string => {
  return process.env.NODE_ENV;
};

const capitalize = (str: string): string => {
  const [first, ...rest] = str;
  return first.toUpperCase().concat(rest.join(""))
}


export {
  setPersistentState,
  capitalize,
  getPersistentState,
  getENV,
  moment,
  isEmpty,
  dateFormat
}