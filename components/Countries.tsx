/* @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { covid } from '../hooks/index';
import { isEmpty, setPersistentState, getPersistentState,clearPersistentState } from '../utils/index';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { Button } from "sancho";

interface Props {
  onClose?: () => void
  reload?: boolean
}

export const Countries: React.FunctionComponent<Props> = (props: Props): React.ReactElement => {
  const { data } = covid.useData(covid.endpoints.countries);
  const [countries, setCountries] = React.useState<object[]>([])

  React.useEffect(() => {
    const state = getPersistentState(
      "countries"
    );

    if (state && state.length) {
      setCountries(
        state
      )
    }
  }, [])

  if (isEmpty(data)) {
    return null
  }

  const renderCountries = () => {
    const options = Object.keys(data.countries).map((key) => {
      const option = data.countries[key];
      return {
        value: option.iso3,
        label: option.name,
        iso2: option.iso2
      }
    })

    return (
      <div css={{ padding: "15px" }}>
        <Select
          placeholder={"Select a country"}
          isLoading={isEmpty(data)}
          isMulti
          components={makeAnimated()}
          value={countries}
          options={options}
          closeMenuOnSelect={false}
          onChange={(value) => {
            setCountries(
              value
            )
          }}
        />
        <div css={{
          display: "flex",
          justifyContent: "flex-end",
          alignContent: "space-between",
          marginTop: '10px'
        }}>
          <Button
            css={{ marginRight: "5px" }}
            intent="danger"
            onClick={() => {
              clearPersistentState(
                'countries'
              )

              if (props.onClose) {
                props.onClose();
              }

              if(props.reload){
                process.browser
                  && window.location.reload()
              }
            }}
          >
            Reset
        </Button>
          <Button
            intent="success"
            onClick={() => {
              setPersistentState(
                "countries",
                countries
              );
              if (props.onClose) {
                props.onClose()
              }

              if(props.reload){
                process.browser
                  && window.location.reload()
              }
            }}>
            Save
        </Button>
        </div>
      </div>
    )
  }

  return renderCountries()
}