import * as React from 'react';
import { covid } from '../hooks/index';
import { Box } from '../ui/components/index'
import { isEmpty, dateFormat } from '../utils/index';

export const Stats: React.FunctionComponent = (): React.ReactElement => {
  const { data } = covid.useData(covid.endpoints.api);

  if (isEmpty(data) || data.success === false) {
    return null
  }

  const stats = [
    {text:"Confirmed", value:data.confirmed.value},
    {text:"Recovered", value:data.recovered.value},
    {text:"Deaths", value:data.deaths.value}
  ];

  return (
    <>
      <h2>Updated at: {dateFormat(data.lastUpdated)}</h2>
      {stats.map((stat) => <p>{`${stat.text}: ${stat.value}`}</p>)}
    </>
  )
}