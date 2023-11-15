import ReactDom from "react-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexRowBox } from "./FlexBox";

interface Props {
  children?: React.ReactNode;
  qs: string;
}
const Portal = ({ children, qs }: Props) => {
  const [element, setElement] = useState<HTMLElement | Element | null>(null);

  useEffect(() => {
    setElement(document.querySelector(qs));
  }, []);

  if (!element) {
    return <></>;
  }

  return ReactDom.createPortal(children!, element);
};

export default function Modal({
  children,
  hide,
  qs,
}: Props & { hide: () => void }) {
  return (
    <Portal qs={qs}>
      <ModalBackground onClick={hide}>
        <ModalMain onClick={(e) => e.stopPropagation()}>{children}</ModalMain>
      </ModalBackground>
    </Portal>
  );
}

Modal.Header = styled(FlexRowBox)`
  justify-content: space-between;
`;

Modal.Body = styled.div`
  margin: auto;
`;

Modal.Footer = styled(FlexRowBox)`
  margin-top: 0.5rem;
  justify-content: space-around;
  width: 100%;
`;

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
`;

const ModalMain = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 36rem;
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid black;
`;
//className="scrollbar-none flex max-h-[36rem] min-h-fit w-full flex-col space-y-4 overflow-auto  border bg-white p-6 lg:max-w-md"
