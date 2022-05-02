import { useState } from "react";
import styled from "styled-components";
import FinishedPage from "./pages/FinishedPage";
import UploadingPage from "./pages/UploadingPage";
import StandbyPage from "./pages/StandbyPage";

const GlobalStyle = styled.main`
  min-height: 100vh;
  background-color: #fafafb;
  display: flex;
  justify-content: center;
`;

type ContainerProps = {
  alignItems?: "start" | "end" | "center";
};

const Container = styled.div<ContainerProps>`
  margin: auto 0;
  box-shadow: 0px 4px 12px rgb(0 0 0 / 10%);
  border-radius: 12px;
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: ${(props) => props.alignItems || ""};
`;

type AppState = "standby" | "uploading" | "finished";

function App() {
  const [state, setState] = useState<AppState>("standby");
  const [percent, setPercent] = useState(0);
  const [imgURL, setImgURL] = useState("");

  const setters = { setState, setPercent, setImgURL };

  let page;
  if (state === "uploading") {
    page = <UploadingPage progress={percent} />;
  } else if (state === "finished") {
    page = <FinishedPage url={imgURL} />;
  } else {
    page = <StandbyPage setters={setters} />;
  }

  return (
    <GlobalStyle>
      <Container>{page}</Container>
    </GlobalStyle>
  );
}

export default App;
