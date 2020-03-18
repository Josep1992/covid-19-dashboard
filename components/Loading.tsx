import * as React from 'react';
import { Skeleton, Spinner } from 'sancho';

type LoaderType = "box" | "list-item"

interface Props {
  animated: boolean,
  type: LoaderType
}


export const Loading: React.FunctionComponent<Props> = ({ animated, type }: Props): React.ReactElement => {
  return null
}