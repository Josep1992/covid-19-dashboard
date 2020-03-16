import * as React from "react";
import { AppProps } from "next/app";

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <Component {...pageProps} />
  )
}

export default App