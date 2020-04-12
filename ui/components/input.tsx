/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { useThemeContext } from "../../context/theme";
import { ComboBox ,ComboBoxInput} from 'sancho';
import { search,Search, isEmpty } from '../../utils/index';

interface Props {
  getSearchResults?: (values: object[]) => void
  rows?: object[],
  placeholder: string,
  label: string,
  onChange: (value: string) => void,
  searcher?: Search
}

const theme = (theme) => {
  return css`
    input{
      color: ${!theme.isLight ? theme.light : theme.dark};
      &:placeholder {
        color: ${!theme.isLight ? theme.light : theme.dark};
      }
    }
  `;
}

// https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate?) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export const Input: React.FunctionComponent<Props> = ({
  rows,placeholder,label,onChange,getSearchResults,searcher}:Props
) => {
  const [query,setQuery] = React.useState<string>('');
  const [filter,setFilter] = React.useState(null);
  const { isLight,colors:{light,dark} } = useThemeContext();

  React.useEffect(() => {
    if (rows && rows.length && searcher) {
      setFilter(
        search({
          ...searcher,
          documents: rows,
        })
      )
    }
  }, [rows]);

  return (
    <ComboBox
      {...(!rows || isEmpty(rows) && { css: { pointerEvent: 'none' } })}
      query={query}
      onQueryChange={v => {
        let _rows = rows;

        setQuery(v)

        if (v) {
          _rows = filter.search(v)
        }

        if(getSearchResults){
          debounce(function(){
            getSearchResults(
              _rows
            )
          },300)()
        }

        onChange(v)
      }}
    >
      <ComboBoxInput
        css={
          theme({
            dark,
            light,
            isLight
          })
        }
        aria-label={label}
        placeholder={placeholder}
      />
    </ComboBox>
  )
}