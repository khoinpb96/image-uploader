import styled from "styled-components";

const Button = styled.button`
  background: #2f80ed;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  color: white;
  transition: 300ms;
  cursor: pointer;

  &:active {
    background: #1e416f;
  }
`;

export default Button;
