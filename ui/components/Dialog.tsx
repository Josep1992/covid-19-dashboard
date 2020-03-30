/* @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { Dialog } from "sancho";
import { useThemeContext } from "../../context/theme";

interface PropsModal {
  isOpen: boolean;
  title?: string;
  mobile?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal = ({
  isOpen,
  title,
  mobile,
  onClose,
  children
}: PropsModal): React.ReactElement => {
  const { isLight,colors:{dark} } = useThemeContext();

  return (
    <Dialog
      {...(!isLight && { style: { color: dark, backgroundColor: dark } })}
      mobileFullscreen={mobile}
      isOpen={isOpen}
      onRequestClose={onClose}
      title={title}
    >
      {children}
    </Dialog>
  );
};