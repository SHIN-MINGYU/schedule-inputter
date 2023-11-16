import { useContext, useEffect, useState } from "react";
import { Button } from "./common/Button";
import { AppContext } from "../App";
import styled from "styled-components";
import { Letter } from "./common/TypoGraphy";
import { FlexRowBox } from "./common/FlexBox";

export default function PresetArea() {
  const {
    setMode,
    setIsPresetPending,
    isPresetPending,
    currentPreset,
    setCurrentPreset,
  } = useContext(AppContext);
  const [preset, setPreset] = useState<string[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
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

  useEffect(() => {
    if (isDeleteMode) setCurrentPreset("");
  }, [isDeleteMode]);

  const deletePreset = (name: string) => {
    window.api.deletePreset(name);
    setIsPresetPending(true);
  };

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
        {!isDeleteMode && (
          <Button
            onClick={() => {
              setIsDeleteMode(true);
            }}
            style={{ width: "100%" }}
            mb="0.25rem"
            ml="0.25rem"
          >
            削除
          </Button>
        )}
        {isDeleteMode && (
          <Button
            onClick={() => {
              setIsDeleteMode(false);
            }}
            style={{ width: "100%" }}
            mb="0.25rem"
            ml="0.25rem"
            color="red"
          >
            X
          </Button>
        )}
      </FlexRowBox>

      <RowDivider />
      <Letter>プリセットリスト</Letter>
      {preset.map((name) => (
        <FlexRowBox style={{ alignItems: "center" }}>
          {name === currentPreset && <Letter weight="bold">→</Letter>}
          <Button
            style={{ width: "100%" }}
            color={name === currentPreset ? "pink" : "black"}
            onClick={() => {
              !isDeleteMode && setCurrentPreset(name);
              isDeleteMode && deletePreset(name);
            }}
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
