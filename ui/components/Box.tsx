/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { Alert } from 'sancho'
import { Theme } from "../../context/index";

interface Props {
  title: string,
  intent?: any
  subtitle?: string
  children?: React.ReactElement
  onClick?: (args?) => void
  cursor?: boolean
}

export const Box: React.FunctionComponent<Props> =
  ({ title,
    subtitle,
    children,
    intent,
    onClick,
    cursor
  }: Props): React.ReactElement => {
    const { isLight,colors:{light,dark} } = Theme.useThemeContext();

    const alertStyle = css`
    width: auto;
    background-color: ${isLight ? light : dark};
    margin: 5px;
    &:hover{
      cursor: ${cursor === false ? "auto" : "pointer"};
      background-color: ${isLight ? "#DBD8E1" : "#2E2E2E" };
    }
    h6 {
      color: ${isLight ? dark : light}
    }
    span {
      color: ${isLight ? dark : light}
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