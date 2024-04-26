// --------------- import external dependencies -----------
import React from "react";
import styled from "styled-components";
import { DialogOverlay, DialogContent } from "@reach/dialog";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

function ModalWrapper({ children, isOpen, onClose }: Props) {
  return (
    <ModalContainer isOpen={isOpen} onDismiss={onClose}>
      <DialogContent>{children}</DialogContent>
    </ModalContainer>
  );
}

export default ModalWrapper;

// ------- component styles ------
const ModalContainer = styled(DialogOverlay)`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5.5px);
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // z-index: 10;
`;
