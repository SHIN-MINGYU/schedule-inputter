import styled from "styled-components";
type LetterSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
type LetterWeight = "thin" | "normal" | "bold";
interface ILetter {
  size?: LetterSize;
  weight?: LetterWeight;
  m?: string;
}

const fontSizeMap = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.375rem",
  "3xl": " 1.5rem",
  "4xl": "1.625rem",
};

export const Letter = styled.p<ILetter>`
  ${(props: ILetter) =>
    `font-size : ${
      props.size ? fontSizeMap[props.size] + ";" : fontSizeMap["md"] + ";"
    }`}

  font-weight : ${(props: ILetter) => (props.weight ? props.weight : "normal")};
  margin: ${(props) => (props.m ? props.m : "0.25rem")};
`;
