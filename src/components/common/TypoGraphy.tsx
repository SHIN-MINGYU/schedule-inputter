import styled from "styled-components";
type LetterSize = "xs" | "sm" | "md" | "lg";

interface ILetter {
  size?: LetterSize;
}

const fontSizeMap = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
};

export const Letter = styled.p<ILetter>`
  ${(props: ILetter) =>
    `font-size : ${props.size ? fontSizeMap[props.size] : fontSizeMap["md"]}`}
`;
