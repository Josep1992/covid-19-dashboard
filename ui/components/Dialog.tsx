import * as React from "react";
import { Dialog } from "sancho";

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
  return (
    <Dialog
      mobileFullscreen={mobile}
      isOpen={isOpen}
      onRequestClose={onClose}
      title={title}
    >
      {children}
    </Dialog>
  );
};