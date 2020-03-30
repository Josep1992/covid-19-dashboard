import * as React from 'react';
import { Stats } from '../components/index';
import { Theme } from "../context/index";

const Home: React.FunctionComponent = (): React.ReactElement => {
  // ! Have to do this higher up on the component tree
  // const {isLight,colors:{dark,light},theme} = Theme.useThemeContext();

  // React.useEffect(() => {
  //   if(process.browser){
  //     const body = document.getElementsByTagName('body')[0];
  //     body.style.background = isLight ? light : "#161822"
  //   }
  // },[theme])

  return (
    <>
      <Stats />
    </>
  );
}

export default Home
