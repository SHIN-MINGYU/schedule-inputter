import styled from "styled-components";
import { Button } from "../common/Button";
import { FlexRowBox } from "../common/FlexBox";
import usePreset from "../../hooks/usePreset";

export default function InputArea() {
  const { presetList, createPrest, deletePreset } = usePreset();
  return (
    <>
      <PresetArea>
        {presetList.map((title) => (
          <PresetButton>{title}</PresetButton>
        ))}
        <Button>추가</Button>
      </PresetArea>
    </>
  );
}

const PresetArea = styled(FlexRowBox)``;

const PresetButton = styled(Button)``;
