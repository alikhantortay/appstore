import { createGlobalStyle } from "styled-components";
import "modern-normalize";
import { variables } from "./variables";

export const GlobalStyle = createGlobalStyle`

${variables}

body {
  font-family: 'Public Sans', sans-serif;
  font-size: 14px;
  line-height: 1.43;
}

h1,
h2,
h3,
p {
  margin: 0;
}

ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

a {text-decoration:none;}

input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
`;
