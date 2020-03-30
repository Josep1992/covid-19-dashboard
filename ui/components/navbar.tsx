/* @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { Navbar, Toolbar, Text } from 'sancho';
import { Countries } from "../../components/index";
import { Modal, Icon } from "../../ui/components/index";
import { useThemeContext } from "../../context/theme";

interface Props {
  background?: string,
  position?: any
}

const hover = css`
  &:hover{
    cursor:pointer
  }
`

const Bar: React.FunctionComponent<Props> = ({ background, position }: Props): React.ReactElement => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const { setTheme, isLight, colors: { dark, light } } = useThemeContext();

  return (
    <>
      <Modal
        mobile={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Text
          variant={"h3"}
          style={{ color: isLight ? dark : light, paddingLeft: "15px", paddingTop: "15px" }}
        >
          Settings
        </Text>
        <Countries
          reload
          onClose={() => setIsOpen(false)}
        />
      </Modal>
      <Navbar
        css={{
          backgroundColor: isLight ? light : dark,
          ...(!isLight && { boxShadow: "none" })
        }}
        position={!position ? "fixed" : position}
      >
        <Toolbar compressed css={{ justifyContent: "space-between" }}>
          <div css={hover}>
            <Icon
              type={"faCog"}
              size={"lg"}
              onClick={() => setIsOpen(true)}
              inverse={!isLight}
            />
          </div>
          <div css={hover}>
            {isLight ? (
              <Icon size={"lg"} type={"faMoon"} onClick={() => setTheme('dark')} />
            ) : (
                <Icon
                  size={"lg"}
                  type={"faSun"}
                  inverse={!isLight}
                  onClick={() => setTheme('light')}
                />
              )
            }
          </div>
        </Toolbar>
      </Navbar>
    </>
  );
}

export default Bar;