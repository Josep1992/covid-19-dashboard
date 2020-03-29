import * as React from "react";
import { AppProps } from "next/app";
import { Bar } from "../ui/components/index";
import {Theme as Context} from "../context/index";

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <Context.ThemeProvider>
      <Bar/>
      <Component {...pageProps} />
    </Context.ThemeProvider>
  );
}

export default App