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
  IconThumbsDown,
  IconThumbsUp,
  IconGlobe
} from 'sancho'
import { useRouter } from 'next/router'
import { DataList } from "../ui/components/index";
import { dateFormat,formatNumber} from '../utils/index';

type Cases = "deaths" | "recovered" | "confirmed"

interface Props {
  endpoint : string;
  cases: Cases;
  header: string
}

const Page: React.FunctionComponent<Props> = ({endpoint,header,cases}: Props): React.ReactElement => {
  const { data } = covid.useData(endpoint);
  const { replace ,query:{total}} = useRouter();

  function getCaseIcon(value:string){
    const icons = {
      confirmed: IconTrendingUp,
      deaths: IconThumbsDown,
      recovered: IconThumbsUp
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

         <div css={{display:'flex',justifyContent: 'center'}}>
          <Text css={{fontSize: '14px'}}>
                Total <IconGlobe css={{
                  position: "relative",
                  top: "4px"}}
                /> {formatNumber(total)}
            </Text>
         </div>
          <DataList
            data={data}
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
        </Container>
      </>
  );
}

export default Page