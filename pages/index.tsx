import * as React from 'react';
import { covid, useLocation } from '../hooks/index';
import { Stats, Countries } from '../components/index';
import { Navbar } from 'sancho';

const Home: React.FunctionComponent = (): React.ReactElement => {
  const { data } = covid.useData(
    covid.endpoints.api
  );

  if (!data || data.success === false) {
    if (data && data.error) {
      return <span>{data.error.message}</span>
    }
    return <span>loading</span>
  }

  return (
    <>
      <Stats />
      {/* <Countries/> */}
    </>
  )
}

export default Home
