import { useLocation } from "./useLocation";
import { useCovidData, endpoints } from "./useCovidData";
import { useMediaQuery } from "./useMediaQuery";

const covid = {
  useData: useCovidData,
  endpoints
};

export {
  useLocation,
  useMediaQuery,
  covid
}