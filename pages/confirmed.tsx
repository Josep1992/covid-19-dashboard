/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { covid } from '../hooks/index';
import { IconButton, Container, IconArrowLeftCircle, Layer, Text, Badge, IconTrendingUp } from 'sancho'
import { useRouter } from 'next/router'
import { DataList } from "../components";
import { isEmpty, dateFormat, capitalize } from '../utils/index';

interface Props {

}

const Confirmed: React.FunctionComponent<Props> = (props: Props): React.ReactElement => {
  const { data } = covid.useData(covid.endpoints.confirmed);
  const { push } = useRouter();
  return (
    <>
      <IconButton
        label={"back"}
        variant={"ghost"}
        size="lg"
        icon={<IconArrowLeftCircle />}
        onClick={() => push("/")}
      />
      <Container
        css={{
          width: "600px",
          height:"800px",
          overflow: "auto",
          overflowY: "scroll"
        }}
      >
        <Text
          css={{textAlign: "center"}}
          variant={"display2"}
        >
          Confirmed Cases
        </Text>
        <DataList
          data={data}
          fakeListItems={30}
          listItemRenderer={(item) => {
            console.log(item);
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
                    <IconTrendingUp css={{marginRight: '8px'}}/>
                    <Text variant={"paragraph"}>
                      {item.confirmed}
                    </Text>
                 </div>
                  <Text css={{ textAlign: 'left', fontSize: '10px', marginLeft: "2px" }}>
                    Updated At: {dateFormat(item.lastUpdated)}
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

export default Confirmed