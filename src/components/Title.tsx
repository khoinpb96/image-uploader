import styled from "styled-components";

type TitleProps = {
  textAlign?: "start" | "end" | "center";
};

const Title = styled.div<TitleProps>`
  font-size: 18px;
  color: #4f4f4f;
  text-align: ${(props) => props.textAlign || ""};
`;

export default Title;
