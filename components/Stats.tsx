/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { covid } from '../hooks/index';
import { Box,Modal } from '../ui/components/index'
import { isEmpty, dateFormat,capitalize } from '../utils/index';
import { Container , Text } from 'sancho';


export const Stats: React.FunctionComponent = (): React.ReactElement => {
  const { data } = covid.useData(covid.endpoints.api);

  if (isEmpty(data) || data.success === false) {
    if (data && data.error) {
      return <Text>{data.error.message}</Text>
    }
    return <Text>loading</Text>
  }

  const stats = [
    { text: "confirmed", value: data.confirmed.value, intent: "warning" },
    { text: "recovered", value: data.recovered.value, intent: "success" },
    { text: "deaths", value: data.deaths.value, intent: "danger" }
  ];

  const containerStyles = css`
    margin-top: 60px;
    width: auto;
    display: flex;
    flex-direction:column;
    @media screen and (min-width:400px){
      width: 400px
    }
  `

  return (
    <Container css={containerStyles}>
      <Text variant="display3" css={{textAlign:'left'}}>
         🌎 COVID-19 DATA
      </Text>
      <Text
        css={{textAlign:'left',fontSize: '10px',marginLeft: "2px"}}
      >
        Updated At: {dateFormat(data.lastUpdated)}
      </Text>
      {stats.map((stat) => (
        <Box
          // onClick={() => }
          key={stat.text}
          intent={stat.intent}
          title={capitalize(stat.text)}
          subtitle={stat.value.toString()}
        />
      ))}
    </Container>
  )
}