import { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Title from "../components/Title";

type FinishedPageProps = {
  url?: string;
};

const ImageContainer = styled.div<FinishedPageProps>`
  min-width: 338px;
  height: 224px;
  background: ${(props) => (props.url ? `url(${props.url})` : "gray")} center
    no-repeat;
  background-size: cover;
  border-radius: 12px;
`;

const URLPlaceholder = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid #e0e0e0;
  background: #f6f8fb;
  border-radius: 8px;
  padding: 11px 7px;
  font-size: 10px;
  color: #4f4f4f;
  font-style: normal;
  padding-right: 5rem;
`;

const URLCopyButton = styled(Button)`
  position: absolute;
  font-size: inherit;
  padding: 9px 18px;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const Icon = styled.div`
  background: url("assets/check.png") no-repeat center;
  height: 36px;
  background-size: contain;
`;
const Url = styled.p`
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
`;

function FinishedPage({ url }: FinishedPageProps) {
  const [clicked, setClicked] = useState(false);

  const copyBtnHandler = () => {
    navigator.clipboard.writeText(url as string);
    setClicked(true);
  };

  return (
    <>
      <Icon />
      <Title textAlign="center">Uploaded Successfully!</Title>
      <ImageContainer url={url} />
      <URLPlaceholder>
        <Url>{url || "https://"}</Url>
        <URLCopyButton onClick={copyBtnHandler}>
          {clicked ? "Copied" : "Copy Link"}
        </URLCopyButton>
      </URLPlaceholder>
    </>
  );
}

export default FinishedPage;
