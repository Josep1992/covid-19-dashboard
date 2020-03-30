/* @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { covid } from '../hooks/index';
import {
  IconButton,
  Container,
  IconArrowLeftCircle,
  Text, Badge,
  ComboBox,
  ComboBoxInput,
} from 'sancho'
import { useRouter } from 'next/router'
import { DataList, Icon } from "../ui/components/index";
import { dateFormat, formatNumber, generateId, search, isEmpty } from '../utils/index';
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
  const { replace, query: { total } } = useRouter();
  const [_search, setSearch] = React.useState<string>('');
  const [filter, setFilter] = React.useState(null);
  const { isLight,colors:{light} } = useThemeContext();

  React.useEffect(() => {
    if (data && data.length) {
      setFilter(
        search({
          documents: data,
          searchBy: "id",
          index: ["countryRegion", "provinceState"],
          strategy: "AllSubstringsIndexStrategy",
        })
      )

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
    <>
      {/* THIS SHOULD BE MOVED FROM PAGE COMPONENT */}
      <IconButton
        css={{ marginTop: "60px" }}
        label={"back"}
        variant={"ghost"}
        size={"lg"}
        icon={<IconArrowLeftCircle />}
        onClick={() => replace("/")}
      />
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

          <ComboBox
            {...(!rows || isEmpty(rows) && { css: { pointerEvent: 'none' } })}
            query={_search}
            onQueryChange={v => {
              let _rows = data;

              setSearch(v)

              if (v) {
                _rows = filter.search(v.trim())
              }

              if (v.length > 1) {
                return setRows(_rows)
              }
              return setRows(data)
            }}
          >
            <ComboBoxInput
              aria-label="Query places"
              placeholder="Search by Providence or Region"
            />
          </ComboBox>

        </div>
        {React.useMemo(() => (
          <DataList
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
        ), [data, rows, isLight])}
      </Container>
    </>
  );
}

export default Page