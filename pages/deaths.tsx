import * as React from "react";
import { Page } from "../components";
import { covid } from "../hooks";

const Deaths: React.FunctionComponent = (props): React.ReactElement => {
  return(
    <Page
      cases={"deaths"}
      header={"Deaths"}
      endpoint={covid.endpoints.deaths}
    />
  );
}

export default Deaths