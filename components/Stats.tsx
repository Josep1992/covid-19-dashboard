/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { covid } from '../hooks/index';
import { Box, Icon } from '../ui/components/index'
import { isEmpty, dateFormat, capitalize, formatNumber } from '../utils/index';
import { Container, Text, Spinner } from 'sancho';
import { useRouter } from 'next/router'
import { Theme } from "../context/index";

const containerStyles = css`
  margin-top: 5em;
  width: auto;
  display: flex;
  flex-direction:column;
  padding: 0;
  @media screen and (min-width:500px){
    width: 499px;
    margin-top: 8em;
  }
`

export const Stats: React.FunctionComponent = (): React.ReactElement => {
  const { data, loading, error } = covid.useData(covid.endpoints.api);
  const { push } = useRouter();
  const { theme } = Theme.useThemeContext()
  const isLight: boolean = theme.value === "light" ? true : false;

  function renderStats() {
    const stats = [
      { text: "confirmed", value: data.confirmed.value, intent: "warning" },
      { text: "recovered", value: data.recovered.value, intent: "success" },
      { text: "deaths", value: data.deaths.value, intent: "danger" }
    ];

    return (
      <>
        <Text css={{ textAlign: 'left', fontSize: '10px', marginLeft: "2px" }}>
          Updated At: {dateFormat(data.lastUpdated)}
        </Text>
        {stats.map((stat) => (
          <Box
            theme={theme.value}
            color={isLight ? undefined: "white"}
            backgroundColor={isLight ? "white" : undefined}
            key={stat.text}
            onClick={() => {
              push({
                pathname: `/${stat.text}`,
                query: { total: stat.value }
              })
            }}
            intent={stat.intent}
            title={capitalize(stat.text)}
            subtitle={formatNumber(stat.value).toString()}
          />
        ))}
      </>
    )
  }

  function render() {
    if (isEmpty(data) || loading && !isEmpty(error)) {
      return (
        <Spinner
          css={{ marginTop: '10px' }}
          center
          size={"xl"}
          label="Getting global data"
        />
      )
    }
    return renderStats()
  }

  return (
    <Container css={containerStyles}>
      <Text variant="display3" css={{ textAlign: 'center' }}>
        <Icon type={"faVirus"} /> {" "}
          Coronavirus Cases
      </Text>
      {!isEmpty(error) && (
        <Box
          theme={theme.value}
          color={isLight ? undefined: "white"}
          backgroundColor={isLight ? "white" : undefined}
          intent="danger"
          title="Error"
          subtitle={error}
        />
      )}
      {render()}
    </Container>
  )
}