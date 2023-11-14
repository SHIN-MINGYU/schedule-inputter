import styled from "styled-components";
type LetterSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl";
type LetterWeight = "thin" | "normal" | "bold";
interface ILetter {
  size?: LetterSize;
  weight?: LetterWeight;
  m?: string;
  color?: string;
  my?: string;
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
  "5xl": "1.75rem",
  "6xl": "1.875rem",
  "7xl": "2rem",
};

export const Letter = styled.p<ILetter>`
  ${(props: ILetter) =>
    `font-size : ${
      props.size ? fontSizeMap[props.size] + ";" : fontSizeMap["md"] + ";"
    }`}
  color : ${(props) => (props.color ? props.color : "inherit")};
  font-weight: ${(props: ILetter) => (props.weight ? props.weight : "normal")};
  margin: ${(props) => (props.m ? props.m : "0.25rem")};
  margin-top: ${(props) => props.my};
  margin-bottom: ${(props) => props.my};
`;
