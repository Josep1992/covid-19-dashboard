/** @jsx jsx */
import * as React from "react";
import { jsx, css } from "@emotion/core";
import { List, ListItem, Container, Skeleton, Layer } from "sancho";

interface ItemRenderer {
  primary?: any;
  secondary?: any;
  contentBefore?: any;
  contentAfter?: any;
  listItemWrapper?: boolean,
}

interface Props {
  data: object[] | any;
  listItemRenderer: (item: any) => ItemRenderer;
  onListItemClick?: (item: any) => any;
  itemListRendererChildren?: (item) => React.ReactNode;
  fakeListItems?: number;
  itemModifier?: (item: any) => void,
  isLight?: boolean,
  id?: string,
  sortBy?: (a,b) => void
}

const DataList = ({
  data,
  listItemRenderer,
  onListItemClick,
  itemListRendererChildren,
  fakeListItems,
  itemModifier,
  isLight,
  id,sortBy
}: Props): JSX.Element | any => {
  const renderFakeListItems = (): React.ReactElement[] => {
    const fakeListArray = Array.from(
      { length: fakeListItems },
      (v: any, i: number) => Skeleton
    );

    return fakeListArray.map((item, index) => {
      return (
        <ListItem
          key={index}
          interactive={false}
          primary={<Skeleton animated css={{ width: "100px" }} />}
          secondary={<Skeleton animated />}
          contentBefore={
            <Skeleton
              animated
              css={{ width: "3.27rem", height: "3.27rem", borderRadius: "50%" }}
            />
          }
        />
      );
    });
  };

  const renderListItems = () => {
    if (!data.length && !fakeListItems) {
      return null;
    }

    const _data = sortBy ? data.sort(sortBy) : data;

    return _data.map((item, index) => {
      const {
        primary,
        secondary,
        contentBefore,
        contentAfter,
        listItemWrapper
      } = listItemRenderer(item);

      if (itemModifier) {
        // This must run before we render the content
        itemModifier(item)
      }

      const Component = !listItemWrapper
        ? React.Fragment
        : Layer;

      return (
        <Component
          {...(listItemWrapper !== undefined && { elevation: "sm" })}
          key={!item.id ? index : item.id} css={{ margin: "10px" }}
        >
          <ListItem
            {...(item.id && { id: item.id })}
            {...(isLight !== undefined && !isLight && { css: { background: "#121212", borderRadius: "1rem" } })}
            onPress={() => onListItemClick && onListItemClick(item)}
            primary={primary}
            secondary={secondary}
            contentBefore={contentBefore}
            contentAfter={contentAfter}
          >
            {itemListRendererChildren && itemListRendererChildren(item)}
          </ListItem>
        </Component>
      );
    });
  };
  return (
    <Container css={{ margin: "15px 0" }}>
      <List {...(id && { id })}>
        {!data || !data.length && fakeListItems
          ? renderFakeListItems()
          : renderListItems()}
      </List>
    </Container>
  );
};

export default DataList;