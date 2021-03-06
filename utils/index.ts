import * as Moment from 'moment';
import { extendMoment } from "moment-range";
import * as JsSearch from 'js-search';
import * as uuid from 'uuid';

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

const clearPersistentState = (key: string): void =>{
  if (process.browser) {
    localStorage.removeItem(key)
  }
}

const getENV = (): string => {
  return process.env.NODE_ENV;
};

const capitalize = (str: string): string => {
  const [first, ...rest] = str;
  return first.toUpperCase().concat(rest.join(""))
}

const formatNumber = (value) => {
  return Number(value).toLocaleString()
}

type Strategy =
  "AllSubstringsIndexStrategy" |
  "PrefixIndexStrategy"        |
  "ExactWordIndexStrategy";

export interface Search {
  searchBy: string,
  documents?: object[],
  index: string | string[],
  strategy: Strategy
}

const search = ({searchBy,documents,index,strategy}:Search) => {
  const search = new JsSearch.Search(searchBy)

  search.indexStrategy = new JsSearch[strategy]();

  if (Array.isArray(index)) {
    index.forEach((i) => search.addIndex(i))
  } else {
    search.addIndex(index);
  }

  search.addDocuments(documents);
  return search;
}

const generateId = (): string => uuid.v4();

export {
  setPersistentState,
  clearPersistentState,
  capitalize,
  getPersistentState,
  getENV,
  moment,
  isEmpty,
  dateFormat,
  formatNumber,
  search,
  generateId
}