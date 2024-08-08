import styled from "styled-components";

export const TagsStyled = styled.div`
  max-width: 312px;
  ${(props) => !props.$footer && "margin: 24px 0;"};

  h2 {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    color: ${(props) =>
      props.$footer
        ? "var(--textSecondary)"
        : "var(--title)"};
  }

  ul {
    display: flex;
    margin-top: 18px;
    flex-wrap: wrap;
    gap: 8px;

    a {
      display: block;
      padding: 5px 11px;
      border: 1px solid
        ${(props) =>
          props.$footer
            ? "#303639"
            : "var(--disabledSecondary)"};
      border-radius: 2px;
      transition: border-color 200ms ease,
        background-color 200ms ease, color 200ms ease;

      font-weight: 500;
      color: ${(props) =>
        props.$footer
          ? "var(--textSecondary)"
          : "var(--title)"};

      &:hover {
        border-color: ${(props) =>
          props.$footer ? "#fff" : "var(--primary)"};
        background-color: ${(props) =>
          props.$footer ? "#303639" : "#fff3eb"};
        color: ${(props) =>
          !props.$footer && "var(--primary)"};
      }
    }
  }
`;
