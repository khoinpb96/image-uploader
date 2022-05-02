import styled from "styled-components";
import Title from "../components/Title";

type ProgressBarProps = {
  progress?: number;
};

const ProgressBar = styled.div<ProgressBarProps>`
  background: #f2f2f2;
  border-radius: 8px;
  height: 6px;
  width: 100%;
  position: relative;
  min-width: 340px;

  &::after {
    position: absolute;
    left: 0;
    height: 100%;
    content: "";
    background: #2f80ed;
    border-radius: 8px;

    width: ${(props) => `${props.progress || 0}%`};
  }
`;

function UploadingPage(props: ProgressBarProps) {
  return (
    <>
      <Title>Uploading</Title>
      <ProgressBar progress={props.progress} />
    </>
  );
}

export default UploadingPage;
