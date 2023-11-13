import styled from "styled-components";
import "./App.css";
import { FlexColBox } from "./components/common/FlexBox";
import { Result } from "./components/TextArea";
import InputArea from "./components/InputArea";

function App() {
  return (
    <AppContainer>
      <AppInputArea>
        <InputArea />
      </AppInputArea>
      <AppResultArea>
        <Result />
      </AppResultArea>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
`;

const AppInputArea = styled(FlexColBox)`
  flex-basis: 65%;
`;

const AppResultArea = styled(FlexColBox)`
  flex-basis: 35%;
`;

export default App;
