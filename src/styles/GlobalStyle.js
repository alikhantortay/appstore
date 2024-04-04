import { createGlobalStyle } from "styled-components";
import "modern-normalize";
import { variables } from "./variables";

export const GlobalStyle = createGlobalStyle`

${variables}

body {color: var(--text);
  font-family: 'Public Sans', sans-serif;
  line-height: 1.5;
}

h1,
h2,
h3,
p {
  margin: 0;
  color: var(--text);
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

a{text-decoration:none;}
`;
