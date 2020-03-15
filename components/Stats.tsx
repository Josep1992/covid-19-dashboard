import * as React from 'react';
import { covid } from '../hooks/index';
import { isEmpty, dateFormat } from '../utils/index';

export const Stats: React.FunctionComponent = (): React.ReactElement => {
  const { data } = covid.useData(covid.endpoints.api);

  if (isEmpty(data) || data.success === false) {
    return null
  }

  return (
    <>
    <h2>Updated at: {dateFormat(data.lastUpdated)}</h2>
      <p>Confirmed: {data.confirmed.value}</p>
      <p>Recovered: {data.recovered.value}</p>
      <p>Deaths: {data.deaths.value}</p>
    </>
  )
}