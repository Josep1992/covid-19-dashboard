/** @jsx jsx */
import * as React from "react";
import { jsx, css } from "@emotion/core";

interface Props {
  title: string,
  description: string
}

export const Box: React.FunctionComponent<Props> = ({ title, description }: Props): React.ReactElement => {
  return (
    <div>

    </div>
  );
}