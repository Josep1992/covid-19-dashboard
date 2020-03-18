/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { covid } from '../hooks/index';
import { IconButton, Container,IconArrowLeftCircle } from 'sancho'
import { useRouter } from 'next/router'

interface Props {

}

const Confirmed: React.FunctionComponent<Props> = (props: Props): React.ReactElement => {
  const { data } = covid.useData(covid.endpoints.confirmed);
  const {push} = useRouter();

  return (
    <IconButton
      label={"back"}
      variant={"ghost"}
      size="lg"
      icon={<IconArrowLeftCircle />}
      onClick={() => push("/")}
    />
  );
}

export default Confirmed