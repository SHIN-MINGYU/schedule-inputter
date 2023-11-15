import { useContext, useEffect, useState } from "react";
import { Button } from "./common/Button";
import { AppContext } from "../App";
import styled from "styled-components";
import { Letter } from "./common/TypoGraphy";
import { FlexRowBox } from "./common/FlexBox";

export default function PresetArea() {
  const { setMode, setIsPresetPending, isPresetPending } =
    useContext(AppContext);
  const [preset, setPreset] = useState<string[]>([]);
  const [currentPreset, setCurrentPreset] = useState<string>("");
  useEffect(() => {
    setIsPresetPending(true);
  }, []);
  useEffect(() => {
    if (isPresetPending) {
      setPreset(() => [
        ...window.api.loadPresetList().map((el) => el.split(".")[0]),
      ]);
      setIsPresetPending(false);
    }
  }, [isPresetPending]);
  return (
    <>
      <FlexRowBox>
        <Button
          style={{ width: "100%" }}
          mb="0.25rem"
          mr="0.25rem"
          onClick={() => setMode((prev) => ({ ...prev, left: "preset" }))}
        >
          New
        </Button>
        <Button style={{ width: "100%" }} mb="0.25rem" ml="0.25rem">
          削除
        </Button>
      </FlexRowBox>

      <RowDivider />
      <Letter>プリセットリスト</Letter>
      {preset.map((name) => (
        <FlexRowBox style={{ alignItems: "center" }}>
          {name === currentPreset && <Letter weight="bold">→</Letter>}
          <Button
            style={{ width: "100%" }}
            color={name === currentPreset ? "pink" : "black"}
            onClick={() => setCurrentPreset(name)}
            mt="0.25rem"
          >
            {name}
          </Button>
        </FlexRowBox>
      ))}
    </>
  );
}

const RowDivider = styled.span`
  border-bottom: 1px solid black;
  transform: scaleY(50%);
`;
