import * as React from "react";
import { AppProps } from "next/app";
import { Bar } from "../ui/components/index";
import {
  IconButton,
  IconArrowLeftCircle,
} from 'sancho'
import { Theme as Context } from "../context/index";
import { useRouter } from 'next/router'

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const { replace, pathname } = useRouter();

  return (
    <Context.ThemeProvider>
      <Bar />
      {pathname !== "/" && (
        <IconButton
          css={{ marginTop: "60px" }}
          label={"back"}
          variant={"ghost"}
          size={"lg"}
          icon={<IconArrowLeftCircle />}
          onClick={() => replace("/")}
        />
      )}
      <Component {...pageProps} />
    </Context.ThemeProvider>
  );
}

export default App