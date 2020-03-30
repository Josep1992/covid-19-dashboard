/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { covid } from '../hooks/index';
import { Box, Icon } from '../ui/components/index'
import { isEmpty, dateFormat, capitalize, formatNumber, getPersistentState, generateId } from '../utils/index';
import { Container, Text, Spinner } from 'sancho';
import { useRouter } from 'next/router'
import { Theme } from "../context/index";


const containerStyles = css`
  margin-top: 5em;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  @media screen and (min-width:500px){
    width: 499px;
    margin-top: 8em;
  }
`

export const Stats: React.FunctionComponent = (): React.ReactElement => {
  const { data, loading, error, covidPromise } = covid.useData(
    covid.endpoints.api
  );
  const { push } = useRouter();
  const { colors:{light,dark} } = Theme.useThemeContext();
  const [countries, setCountries] = React.useState<any[]>([]);
  const [countriesData, setCountriesData] = React.useState<any[]>([]);

  React.useEffect(() => {
    const state = getPersistentState("countries");
    if (state) {
      setCountries(state);
    }
  }, [])

  async function getCountriesData() {
    if (countries.length) {
      try {
        const responses = [];
        for (let country of countries) {
          const response = await covidPromise(
            covid.endpoints.countries + `/${country.iso2}`
          )
          response.label = country.label;
          response.id = country.iso2;
          responses.push(await response)
        }
        setCountriesData(responses);
      } catch (error) {
        setCountriesData([])
      }
    }
  }

  React.useEffect(() => {
    getCountriesData()
  }, [countries])

  function getIntent(value: string) {
    const intent = {
      confirmed: "warning",
      recovered: "success",
      deaths: "danger"
    }

    return intent[value]
  }


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
            key={stat.value}
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

  function renderCountries() {
    if (countriesData.length) {
      return (
        <>
          <Text
            css={{ textAlign: 'left', fontSize: '14px', marginLeft: "2px" }}>
            Countries
          </Text>
          {countriesData.map((country) => {
            return (
              <Box
                cursor={false}
                key={country.id}
                intent={getIntent("confirmed")}
                title={country.label}
                subtitle={formatNumber(country.confirmed.value).toString()}
              />
            )
          })}
        </>
      )
    }

    return (
      <Text
        css={{marginTop: '10px',textAlign: 'center'}}
        variant={"lead"}>
        Click on the
        {" "}
        <Icon
          type={"faCog"}
          size={"lg"}
        /> {" "}
      icon to add some countries
      </Text>
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
    return [renderStats(), renderCountries()]
  }

  return (
    <Container css={containerStyles}>
      <div css={{ margin: "auto",color: dark }}>
        <Text variant="display3" css={{ textAlign: 'center' }}>
          <Icon type={"faLungsVirus"} /> {" "}
          Coronavirus Cases
      </Text>
        {!isEmpty(error) && (
          <Box
            intent="danger"
            title="Error"
            subtitle={error}
          />
        )}
        {render()}
      </div>
    </Container>
  )
}