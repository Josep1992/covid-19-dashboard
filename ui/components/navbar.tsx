/* @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { Navbar, Toolbar } from 'sancho';
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
  const { setTheme, theme, isLight } = useThemeContext();

  return (
    <>
      <Modal
        mobile={false}
        title={"Settings"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Countries onClose={() => setIsOpen(false)} />
      </Modal>
      <Navbar
        css={{
          backgroundColor: isLight ? "#F2F2F2" : "#1A232A",
          boxShadow: 'none'
        }}
        position={!position ? "fixed" : position}
      >
        <Toolbar compressed css={{ justifyContent: "space-between" }}>
          {/* <Icon
            type={"faCog"}
            size={"lg"}
            onClick={() => setIsOpen(true)}
            inverse={!isLight}
          /> */}
          <div css={hover}>
            {theme.value === "light" ? (
              <Icon size={"lg"} type={"faMoon"} onClick={() => setTheme('dark')} />
            ) : (
                <Icon size={"lg"} type={"faSun"} onClick={() => setTheme('light')} inverse={!isLight} />
              )
            }
          </div>
        </Toolbar>
      </Navbar>
    </>
  );
}

export default Bar;