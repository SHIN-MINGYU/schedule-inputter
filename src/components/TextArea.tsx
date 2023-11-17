import styled from "styled-components";
import { Letter } from "./common/TypoGraphy";
import { FlexColBox, FlexRowBox } from "./common/FlexBox";
import { Button } from "./common/Button";
import { RefObject } from "react";

export function Result({ _ref }: { _ref: RefObject<HTMLTextAreaElement> }) {
  return (
    <ResultContainer>
      <Letter color="#EF5390" m="0" size="7xl" style={{ marginLeft: "0.5rem" }}>
        出力結果
      </Letter>
      <ResultTextArea ref={_ref} readOnly></ResultTextArea>
      <ResultButtonArea>
        <Button
          mt="0.5rem"
          style={{ backgroundColor: "#EF53903B" }}
          color="parents"
          onClick={() => {
            navigator.clipboard.writeText(_ref.current!.value);
          }}
        >
          <Letter color="#EF5390">コピー</Letter>
        </Button>
        <Button
          mt="0.5rem"
          style={{ backgroundColor: "#EF53903B" }}
          color="parents"
          onClick={() => {
            _ref.current!.value = "";
          }}
        >
          <Letter color="#EF5390">リセット</Letter>
        </Button>
      </ResultButtonArea>
    </ResultContainer>
  );
}

const ResultContainer = styled(FlexColBox)`
  flex-basis: 100%;
`;

const ResultTextArea = styled.textarea`
  resize: none;
  flex-basis: 100%;
  border-radius: 5%;
  padding: 0.5rem;
  background-image: url(../../public/chiikawa_bot.png);
  background-repeat: no-repeat;
  background-position: 0 100%;
`;

const ResultButtonArea = styled(FlexRowBox)`
  justify-content: space-around;
`;
