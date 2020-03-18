import * as React from 'react';
import { covid } from '../hooks/index';
import { isEmpty } from '../utils/index';

export const Countries: React.FunctionComponent = (): React.ReactElement => {
  const { data } = covid.useData(covid.endpoints.countries);
  const [country, setCountry] = React.useState(undefined)

  if (isEmpty(data)) {
    return null
  }

  const renderCountries = () => {
    return (
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        {Object.keys(data.countries).map((key) => {
          return <option key={key} value={key}>{key}</option>
        })}
      </select>
    )
  }

  return renderCountries()
}