import fetch from 'isomorphic-unfetch';
import * as React from 'react';

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
  const [data, setData] = React.useState<Covid | any>(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<any>({});

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

      setError(error.message)
    }
    setTimeout(() => setLoading(false), 1000)
  }

  React.useEffect(() => {
    fetchCovidData()
  }, [])

  return {
    data,
    loading,
    error,
  }
}
