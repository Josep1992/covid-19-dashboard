/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { covid } from '../hooks/index';
import { Box,Modal } from '../ui/components/index'
import { isEmpty, dateFormat,capitalize } from '../utils/index';
import { Container , Text , Spinner} from 'sancho';
import { useRouter } from 'next/router'

const containerStyles = css`
  margin-top: 60px;
  width: auto;
  display: flex;
  flex-direction:column;
  @media screen and (min-width:400px){
    width: 400px
  }
`

export const Stats: React.FunctionComponent = (): React.ReactElement => {
  const { data,loading,error } = covid.useData(covid.endpoints.api);
  const { push } = useRouter();

  const renderStats = () => {
    if(data){
      const stats = [
        { text: "confirmed", value: data.confirmed.value, intent: "warning"  },
        { text: "recovered", value: data.recovered.value, intent: "success" },
        { text: "deaths", value: data.deaths.value, intent: "danger" }
      ];

      return (
        <>
          <Text css={{textAlign:'left',fontSize: '10px',marginLeft: "2px"}}>
              Updated At: {dateFormat(data.lastUpdated)}
          </Text>
          {stats.map((stat) => (
           <Box
              key={stat.text}
              onClick={() => { push(`/${stat.text}`)}}
              intent={stat.intent}
              title={capitalize(stat.text)}
              subtitle={stat.value.toString()}
            />
          ))}
        </>
      )
    }
  }

  return (
    <Container css={containerStyles}>
      <Text variant="display3" css={{textAlign:'left'}}>
         🌎 COVID-19 DATA
      </Text>
      {!isEmpty(error) && (
         <Box
          intent="danger"
          title="Error"
          subtitle={error}
        />
      )}
      {loading ? (
          <Spinner
            css={{marginTop: '10px'}}
            center
            size={"xl"}
            label="Getting global data"
          />
        ) :renderStats()}
    </Container>
  )
}