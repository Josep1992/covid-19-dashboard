import { covid, useLocation } from '../hooks/index';
import { Countries } from '../components/Countries';
import { Stats } from '../components/Stats';

const Home: React.FunctionComponent = (): React.ReactElement => {
  const { data } = covid.useData(
    covid.endpoints.api
  );

  if (!data || data.success === false) {
    return <span>loading</span>
  }

  return (
    <>
      <Stats/>
      {/* <Countries/> */}
    </>
  )
}

export default Home
