const breakpoints = {
  desktop: 1280,
  tablet: 768,
  mobile: 375,
};

export const mediaQueries = (key) => {
  return (style) =>
    `@media screen and (min-width: ${breakpoints[key]}px) {${style}}`;
};

/////////example
// ${mediaQueries('tablet')`
//     padding-top: 72px;`};
