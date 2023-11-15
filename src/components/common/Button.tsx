import styled from "styled-components";

export const Button = styled.button<{
  m?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  color?: string;
}>`
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  margin: ${(props) => props.m};
  margin-top: ${(props) => props.mt};
  margin-left: ${(props) => props.ml};
  margin-right: ${(props) => props.mr};
  margin-bottom: ${(props) => props.mb};
`;
