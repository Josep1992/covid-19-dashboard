/* @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { covid } from '../hooks/index';
import {
  IconButton,
  Container,
  IconArrowLeftCircle,
  Text, Badge,
  IconTrendingUp,
  IconTrendingDown,
  IconGlobe,
  ComboBox,
  ComboBoxInput,
} from 'sancho'
import { useRouter } from 'next/router'
import { DataList } from "../ui/components/index";
import { dateFormat,formatNumber,generateId,search} from '../utils/index';
import debounce from "lodash.debounce";

type Cases = "deaths" | "recovered" | "confirmed"

interface Props {
  endpoint : string;
  cases: Cases;
  header: string
}

const Page: React.FunctionComponent<Props> = ({endpoint,header,cases}: Props): React.ReactElement => {
  const { data } = covid.useData(endpoint);
  const [rows,setRows] = React.useState(undefined);
  const { replace ,query:{total}} = useRouter();
  const [_search,setSearch] = React.useState<string>('');
  const [filter,setFilter] = React.useState(null);

  React.useEffect(() => {
    if(data && data.length){
      setFilter(
        search({
          documents: data,
          searchBy: "id",
          index: ["countryRegion","provinceState"],
          strategy: "AllSubstringsIndexStrategy",
        })
      )

      setRows(data)
    }
  },[data]);

  function getCaseIcon(value:string){
    const icons = {
      confirmed: IconTrendingUp,
      deaths: IconTrendingDown,
      recovered: IconTrendingUp
    }
    return icons[value];
  };

  function getBadgeColor(value:string){
    const colors = {
      confirmed: '#F08C00',
      deaths: '#E03131',
      recovered: '#2E9E44'
    }
    return colors[value];
  }

  return (
      <>
        <IconButton
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
            @media screen and (min-width: 600px){
              width: 599px;
            }
          `}
        >
          <Text
            css={{textAlign: "center", textTransform:"uppercase"}}
            variant={"display3"}
          >
            {header}
          </Text>

         <div css={{display:'flex',justifyContent: 'center',marginBottom: '10px'}}>
          <Text css={{fontSize: '14px'}}>
                Total <IconGlobe css={{
                  position: "relative",
                  top: "4px"}}
                /> {formatNumber(total)}
            </Text>
         </div>
         <div css={{width: "auto",margin: "0 auto"}}>
            <ComboBox
                query={_search}
                onQueryChange={v => {
                  let _rows = data;

                  setSearch(v)

                  if(v){
                    _rows = filter.search(v.trim())
                  }

                  if(v.length > 1){
                    setRows(_rows)
                  }else{
                    setRows(data)
                  }
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
              itemModifier={(item) => {
                item.id = generateId();
              }}
              data={rows}
              fakeListItems={30}
              listItemRenderer={(item) => {
                return {
                  listItemWrapper: true,
                  primary: item.provinceState,
                  secondary: item.countryRegion,
                  contentBefore: (
                    <Text>
                      {item.iso3}
                    </Text>
                  ),
                  contentAfter: (
                    <div>
                    <div css={{display: "flex",justifyContent:"flex-end"}}>
                      {React.createElement(getCaseIcon(cases),{css:{marginRight: '8px'}})}
                        <Badge css={{backgroundColor:getBadgeColor(cases),borderRadius: "5px"}}>
                          {formatNumber(item[cases])}
                        </Badge>
                    </div>
                      <Text css={{ textAlign: 'left', fontSize: '10px', marginLeft: "2px" }}>
                      {dateFormat(item.lastUpdated)}
                      </Text>
                    </div>
                  )
                };
              }}
          />
          ),[data,rows])}
        </Container>
      </>
  );
}

export default Page