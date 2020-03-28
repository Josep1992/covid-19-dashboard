import * as React from "react";
import { AppProps } from "next/app";
import { Bar } from "../ui/components/index";

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <>
      {/* <Bar/> */}
      <Component {...pageProps} />
    </>
  )
}

export default App