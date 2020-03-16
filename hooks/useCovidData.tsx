import fetch from 'isomorphic-unfetch';
import * as React from 'react';
import { isEmpty } from '../utils/index'

export interface Covid {
  confirmed: Confirmed;
  recovered: Confirmed;
  deaths: Confirmed;
  dailySummary: string;
  dailyTimeSeries: CountryDetail;
  image: string;
  source: string;
  countries: string;
  countryDetail: CountryDetail;
  lastUpdate: string;
}

export interface Confirmed {
  value: number;
  detail: string;
}

export interface CountryDetail {
  pattern: string;
  example: string;
}

export const endpoints = {
  main: "https://covid19.mathdro.id/",
  api: "api",
  confirmed: 'api/confirmed',
  recovered: "api/recovered",
  deaths: 'api/deaths',
  countries: "api/countries"
}

export function useCovidData(path) {
  const [data, setData] = React.useState<Covid | any>(undefined)

  const fetchCovidData = async (): Promise<void> => {
    const request = await fetch(`${endpoints.main}${path}`);
    try {
      setData(
        await request.json()
      );
    } catch (error) {
      console.error(
        error
      );

      if (!data || isEmpty(data)) {
        const data = {
          success: false,
          error: {
            message: error.message
          }
        }

        setData(data)
      }
    }
  }

  React.useEffect(() => {
    fetchCovidData()
  }, [])

  return {
    data
  }
}