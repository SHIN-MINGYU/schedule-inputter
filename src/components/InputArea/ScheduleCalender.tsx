import styled from "styled-components";
import { FlexColBox, FlexRowBox } from "../common/FlexBox";
import { Letter } from "../common/TypoGraphy";

export default function ScheduleCalender() {
  return (
    <ScheduleCalenderContainer>
      <ScheduleCalenderHeader>
        <Letter size="4xl" weight="bold">
          1月
        </Letter>
      </ScheduleCalenderHeader>
    </ScheduleCalenderContainer>
  );
}

const ScheduleCalenderContainer = styled(FlexColBox)`
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  margin: 0.5rem;
  flex: 1 1 0%;
`;

const ScheduleCalenderHeader = styled(FlexRowBox)``;

const ScheduelCalenderBody = styled.div``;
