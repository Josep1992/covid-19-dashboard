/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { covid } from '../hooks/index';
import { Box,Icon } from '../ui/components/index'
import { isEmpty, dateFormat,capitalize,formatNumber } from '../utils/index';
import { Container , Text , Spinner} from 'sancho';
import { useRouter } from 'next/router'



const containerStyles = css`
  margin-top: 60px;
  width: auto;
  display: flex;
  flex-direction:column;
  padding: 0;
  @media screen and (min-width:500px){
    width: 499px
  }
`

export const Stats: React.FunctionComponent = (): React.ReactElement => {
  const { data,loading,error } = covid.useData(covid.endpoints.api);
  const { push } = useRouter();

  function renderStats() {
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
              backgroundColor={"white"}
              key={stat.text}
              onClick={() => { push({
                pathname : `/${stat.text}`,
                query : {total: stat.value}
              })}}
              intent={stat.intent}
              title={capitalize(stat.text)}
              subtitle={formatNumber(stat.value).toString()}
            />
          ))}
        </>
      )
  }

  function render(){
    if(isEmpty(data) || loading ){
      return (
          <Spinner
            css={{marginTop: '10px'}}
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
      <Text variant="display3" css={{textAlign:'center'}}>
       <Icon type={"faVirus"}/>{" "}
        COVID19 Data
      </Text>
      {!isEmpty(error) && (
         <Box
          backgroundColor={"white"}
          intent="danger"
          title="Error"
          subtitle={error}
        />
      )}
      {render()}
    </Container>
  )
}