import styled from "styled-components";

interface ButtonProps {
  m?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  color?: string;
}

export const Button = styled.button<ButtonProps>`
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  margin: ${({ m }) => m};
  margin-top: ${({ mt }) => mt};
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
`;
