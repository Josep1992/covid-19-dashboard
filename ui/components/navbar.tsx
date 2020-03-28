/* @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { Navbar, IconSettings, Toolbar ,Button} from 'sancho';
import {Countries} from "../../components/index";
import {Modal,Icon} from "../../ui/components/index";

interface Props {
  background?: string,
  position?: any
}

const Bar: React.FunctionComponent<Props> = ({ background, position }: Props): React.ReactElement => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  return (
    <>
      <Modal
        mobile={false}
        title={"Settings"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Countries onClose={() => setIsOpen(false)}/>
      </Modal>
      <Navbar
        css={{
          backgroundColor: !background ? "#F2F3F5" : background,
          boxShadow: 'none'
        }}
        position={!position ? "fixed" : position}
      >
        <Toolbar compressed>
          <Icon
            type={"faCog"}
            size={"lg"}
            onClick={() => setIsOpen(true)}
          />
        </Toolbar>
      </Navbar>
    </>
  );
}

export default Bar;