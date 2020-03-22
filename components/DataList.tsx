/** @jsx jsx */
import * as React from "react";
import { jsx, css } from "@emotion/core";
import { List, ListItem, Container, Skeleton , Layer } from "sancho";

interface ItemRenderer {
  primary?: any;
  secondary?: any;
  contentBefore?: any;
  contentAfter?: any;
  listItemWrapper?: boolean
}

interface Props {
  data: object[] | any;
  listItemRenderer: (item: any) => ItemRenderer;
  onListItemClick?: (item: any) => any;
  itemListRendererChildren?: (item) => React.ReactNode;
  fakeListItems?: number;
}

const DataList = ({
  data,
  listItemRenderer,
  onListItemClick,
  itemListRendererChildren,
  fakeListItems,
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

  const renderListItems = (): JSX.Element => {
    if (!data.length && !fakeListItems) {
      return null;
    }

    return data.map(item => {
      const {
        primary,
        secondary,
        contentBefore,
        contentAfter,
        listItemWrapper
      } = listItemRenderer(item);
      const Component = !listItemWrapper ? React.Fragment : Layer;

      return (
        <Component
          elevation={!listItemWrapper ? undefined: "sm"}
          key={item.id} css={{margin: "10px"}}
        >
          <ListItem
            onPress={() => onListItemClick(item)}
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
      <List>
        {!data || !data.length && fakeListItems
          ? renderFakeListItems()
          : renderListItems()}
      </List>
    </Container>
  );
};

export default DataList;