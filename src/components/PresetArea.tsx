import { useContext, useEffect, useState } from "react";
import { Button } from "./common/Button";
import { AppContext } from "../App";
import styled from "styled-components";
import { Letter } from "./common/TypoGraphy";
import { FlexRowBox } from "./common/FlexBox";
import RightArrowImgSrc from "../../public/right_arrow.png";

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
          style={{
            width: "100%",
            padding: "0.65rem 0",
            backgroundColor: "#EF53903B",
          }}
          color="transparents"
          mb="0.25rem"
          mr="0.25rem"
          onClick={() => setMode((prev) => ({ ...prev, left: "preset" }))}
        >
          <Letter color="#EF5390">New</Letter>
        </Button>
        {!isDeleteMode && (
          <Button
            onClick={() => {
              setIsDeleteMode(true);
            }}
            style={{
              width: "100%",
              padding: "0.65rem 0",
              backgroundColor: "#EF53903B",
            }}
            color="transparents"
            mb="0.25rem"
            ml="0.25rem"
          >
            <Letter color="#EF5390">削除</Letter>
          </Button>
        )}
        {isDeleteMode && (
          <Button
            onClick={() => {
              setIsDeleteMode(false);
            }}
            style={{
              width: "100%",
              padding: "0.65rem 0",
              backgroundColor: "#EF5353D1",
            }}
            color="transparents"
            mb="0.25rem"
            ml="0.25rem"
          >
            <Letter color="#FF0000">X</Letter>
          </Button>
        )}
      </FlexRowBox>

      <RowDivider />
      <Letter>プリセットリスト</Letter>
      <PresetButtonBox>
        {preset.map((name) => (
          <FlexRowBox
            style={{
              alignItems: "center",
              overflow: "hidden",
              padding: "0 1rem",
            }}
          >
            {name === currentPreset && (
              <img
                style={{ width: "16px", padding: "0 0.5rem" }}
                src={RightArrowImgSrc}
              ></img>
            )}
            <Button
              style={{
                width: "100%",
                backgroundColor: `${
                  name === currentPreset ? "#EF53903B" : "white"
                }`,
              }}
              color={name === currentPreset ? "#EF5390" : "black"}
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
      </PresetButtonBox>
    </>
  );
}

const RowDivider = styled.span`
  border-bottom: 1px solid black;
  transform: scaleY(50%);
`;

const PresetButtonBox = styled.div`
  width: 100%;
  height: 88%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ef5390;
  }
`;
