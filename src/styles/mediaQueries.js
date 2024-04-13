const breakpoints = {
  tablet: 1319,
  mobile: 767,
};

export const mediaQueries = (key) => {
  return (style) =>
    `@media screen and (max-width: ${breakpoints[key]}px) {${style}}`;
};

/////////example
// ${mediaQueries('tablet')`
//     padding-top: 72px;`};
