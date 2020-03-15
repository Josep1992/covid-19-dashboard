import {useLocation} from "./useLocation";
import {useCovidData,endpoints} from "./useCovidData";

const covid = {
  useData: useCovidData,
  endpoints
};

export {
  useLocation,
  covid
}