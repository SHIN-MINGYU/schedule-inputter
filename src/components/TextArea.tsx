import styled from "styled-components";
import { Letter } from "./common/TypoGraphy";
import { FlexColBox, FlexRowBox } from "./common/FlexBox";
import { Button } from "./common/Button";

export function Result() {
  return (
    <ResultContainer>
      <Letter m="0" size="7xl" style={{ marginLeft: "0.5rem" }}>
        出力結果
      </Letter>
      <ResultTextArea></ResultTextArea>
      <ResultButtonArea>
        <Button>コピー</Button>
        <Button>リセット</Button>
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
`;

const ResultButtonArea = styled(FlexRowBox)`
  justify-content: space-around;
`;
