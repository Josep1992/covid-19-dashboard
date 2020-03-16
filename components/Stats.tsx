/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { covid } from '../hooks/index';
import { Box } from '../ui/components/index'
import { isEmpty, dateFormat } from '../utils/index';
import { Container , Text, Skeleton } from 'sancho';


export const Stats: React.FunctionComponent = (): React.ReactElement => {
  const { data } = covid.useData(covid.endpoints.api);

  if (isEmpty(data) || data.success === false) {
    return null
  }

  const stats = [
    { text: "Confirmed", value: data.confirmed.value, intent: "warning" },
    { text: "Recovered", value: data.recovered.value, intent: "success" },
    { text: "Deaths", value: data.deaths.value, intent: "danger" }
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
          key={stat.text}
          intent={stat.intent}
          title={stat.text}
          subtitle={isEmpty(data) || data.success === false ? <Skeleton/> :stat.value.toString()}
        />
      ))}
    </Container>
  )
}