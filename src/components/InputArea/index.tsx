import styled from "styled-components";
import { Button } from "../common/Button";
import { FlexColBox, FlexRowBox } from "../common/FlexBox";
import usePreset from "../../hooks/usePreset";
import ScheduleCalender from "./ScheduleCalender";

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
      <ScheduleCalenderArea>
        <ScheduleCalender></ScheduleCalender>
      </ScheduleCalenderArea>
    </>
  );
}

const PresetArea = styled(FlexRowBox)`
  margin: 0.25rem;
`;

const PresetButton = styled(Button)``;

const ScheduleCalenderArea = styled(FlexColBox)``;
