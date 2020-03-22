import * as React from "react";
import { Page } from "../components";
import { covid } from "../hooks";

const Confirmed: React.FunctionComponent = (props): React.ReactElement => {
  return(
    <Page
      cases={"confirmed"}
      header={"CONFIRMED CASES"}
      endpoint={covid.endpoints.confirmed}
    />
  );
}

export default Confirmed