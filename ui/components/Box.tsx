/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { Alert } from 'sancho'

interface Props {
  title: string,
  color?: string,
  intent?: any
  subtitle?: string
  children?: React.ReactElement
  onClick?: (args?) => void
  backgroundColor?: string
  theme?: string
  cursor?: boolean
}

export const Box: React.FunctionComponent<Props> =
  ({ title,
    subtitle,
    children,
    intent,
    color,
    onClick,
    backgroundColor,
    theme,
    cursor
  }: Props): React.ReactElement => {

    const alertStyle = css`
    width: auto;
    background-color: ${backgroundColor ? backgroundColor : "#1A232A"};
    margin: 5px;
    &:hover{
      cursor: ${cursor === false ? "auto" : "pointer"};
      background-color: ${theme  === "light" ? "#F2F2F2" : "#3C4146" };
    }
    h6 {
      color: ${color ? color : "#1A232A"}
    }
    span {
      color: ${color ? color : "#1A232A"}
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