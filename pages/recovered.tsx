import * as React from "react";
import { Page } from "../components";
import { covid } from "../hooks";

const Recovered: React.FunctionComponent = (props): React.ReactElement => {
  return(
    <Page
      cases={"recovered"}
      header={"RECOVERED CASES"}
      endpoint={covid.endpoints.recovered}
    />
  );
}

export default Recovered