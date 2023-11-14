import styled from "styled-components";
import { Letter } from "./common/TypoGraphy";
import { FlexColBox, FlexRowBox } from "./common/FlexBox";
import { Button } from "./common/Button";
import { RefObject } from "react";

export function Result({ _ref }: { _ref: RefObject<HTMLTextAreaElement> }) {
  return (
    <ResultContainer>
      <Letter m="0" size="7xl" style={{ marginLeft: "0.5rem" }}>
        出力結果
      </Letter>
      <ResultTextArea ref={_ref} readOnly></ResultTextArea>
      <ResultButtonArea>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(_ref.current!.value);
          }}
        >
          コピー
        </Button>
        <Button
          onClick={() => {
            _ref.current!.value = "";
          }}
        >
          リセット
        </Button>
      </ResultButtonArea>
    </ResultContainer>
  );
}

const ResultContainer = styled(FlexColBox)`
  padding: 1rem;
  flex-basis: 100%;
`;

const ResultTextArea = styled.textarea`
  resize: none;
  flex-basis: 100%;
  border-radius: 5%;
  padding: 0.5rem;
`;

const ResultButtonArea = styled(FlexRowBox)`
  justify-content: space-around;
`;
