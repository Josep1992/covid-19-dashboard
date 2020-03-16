import * as React from "react";

interface IMedia {
  matches: boolean;
  width: number;
}

const initialState = 0;

const getInnerWidth = () =>
  process.browser ? window.innerWidth : initialState;

export const useMediaQuery = (media: string): IMedia => {
  const [width, setWidth] = React.useState<number>(getInnerWidth());
  const [matches, setMatch] = React.useState<boolean>(
    process.browser ? window.matchMedia(`(${media})`).matches : false
  );

  const handle = React.useCallback(() => {
    if (process.browser) {
      window.addEventListener("resize", function() {
        setWidth(getInnerWidth());
        setMatch(window.matchMedia(media).matches);
      });
    }
  }, [width, matches]);

  React.useEffect(() => {
    handle();
  }, [handle]);

  return {
    matches,
    width
  };
};