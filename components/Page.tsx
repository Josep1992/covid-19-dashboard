/* @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { covid } from '../hooks/index';
import {
  IconButton,
  Container,
  IconArrowLeftCircle,
  Text, Badge,
} from 'sancho'
import { useRouter } from 'next/router'
import { DataList, Icon, Input } from "../ui/components/index";
import { dateFormat, formatNumber, generateId } from '../utils/index';
import { useThemeContext } from "../context/theme";

type Cases = "deaths" | "recovered" | "confirmed"

interface Props {
  endpoint: string;
  cases: Cases;
  header: string
}

const Page: React.FunctionComponent<Props> = ({ endpoint, header, cases }: Props): React.ReactElement => {
  const { data } = covid.useData(endpoint);
  const [rows, setRows] = React.useState(undefined);
  const { query: { total } } = useRouter();
  const { isLight, colors: { light } } = useThemeContext();

  React.useEffect(() => {
    if (data && data.length) {
      setRows(data)
    }
  }, [data]);

  function getFontStyles() {
    return { ...(!isLight && { color: light }) }
  }

  function getCaseIcon(value: string) {
    const icons = {
      confirmed: { type: 'faVirus' },
      deaths: { type: 'faSkull' },
      recovered: { type: 'faVirusSlash' },
    }
    return React.createElement(Icon, {
      ...icons[value],
      ...{ size: "lg", inverse: !isLight },
      style: { marginRight: '8px' }
    })
  };

  function getBadgeColor(value: string) {
    const colors = {
      confirmed: '#F08C00',
      deaths: '#E03131',
      recovered: '#2E9E44'
    }
    return colors[value];
  }

  return (
    <Container
      css={css`
            width: auto;
            padding: 0;
            @media screen and (min-width: 800px){
              width: 750px;
            }
          `}
    >
      <div>
        <Text
          css={{ textAlign: "center", textTransform: "uppercase" }}
          variant={"display3"}
        >
          {header}
        </Text>
        <div css={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <Text css={{ fontSize: '14px' }}>
            Total
                  {" "}
            {isLight ? (
              <Icon type={"faGlobeAmericas"} size={"2x"} />
            ) : (<Icon type={"faGlobeEurope"} size={"2x"} />)}
            {" "}
            {formatNumber(total)}
          </Text>
        </div>
        <div css={{ width: "auto", margin: "0 auto" }}>
        </div>

        <Input
          rows={data}
          placeholder={"Search by Providence or Region"}
          label={"Query places"}
          onChange={(value) => { }}
          getSearchResults={(result) => setRows(result)}
          searcher={{
            searchBy: "lat",
            index: ["countryRegion", "provinceState","iso2","iso3"],
            strategy: 'AllSubstringsIndexStrategy',
          }}
        />

      </div>
        <DataList
          id={"data-list"}
          isLight={isLight}
          itemModifier={(item) => {
            item.id = generateId();
          }}
          data={rows}
          fakeListItems={30}
          listItemRenderer={(item) => {
            return {
              listItemWrapper: true,
              primary: <Text css={{ ...getFontStyles() }} >{item.provinceState}</Text>,
              secondary: <Text css={{ ...getFontStyles() }}>{item.countryRegion}</Text>,
              contentBefore: (
                <Text css={{ ...getFontStyles() }}>
                  {item.iso3}
                </Text>
              ),
              contentAfter: (
                <div>
                  <div css={{ display: "flex", justifyContent: "flex-end" }}>
                    {getCaseIcon(cases)}
                    <Badge css={{ backgroundColor: getBadgeColor(cases), borderRadius: "5px" }}>
                      {formatNumber(item[cases])}
                    </Badge>
                  </div>
                  <Text
                    style={{ ...getFontStyles() }}
                    css={{ textAlign: 'left', fontSize: '10px', marginLeft: "2px" }}>
                    {dateFormat(item.lastUpdated)}
                  </Text>
                </div>
              )
            };
          }}
        />
    </Container>
  );
}

export default Page