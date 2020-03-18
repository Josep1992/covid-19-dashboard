/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { Alert } from 'sancho'

interface Props {
  title: string,
  titleColor?: string,
  intent?: any
  subtitle?: string
  children?: React.ReactElement
  onClick?: (args?) => void
}

export const Box: React.FunctionComponent<Props> =
  ({ title, subtitle, children, intent, titleColor, onClick }: Props): React.ReactElement => {

    const alertStyle = css`
    width: auto;
    background-color: #1A232A;
    margin: 5px;
    h6 {
      color: ${titleColor ? titleColor : "white"}
    }
  `;

    return (
      <Alert
        css={alertStyle}
        intent={intent}
        title={title}
        subtitle={subtitle}
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
      >
        {children}
      </Alert>
    );
  }