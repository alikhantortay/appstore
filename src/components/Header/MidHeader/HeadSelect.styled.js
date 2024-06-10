import styled from "styled-components";
import Select from "react-select";

export const HeadSelectStyled = styled(Select)`
  margin-left: 24px;

  line-height: 1.5;

  &:hover {
    cursor: pointer;
  }

  .Select__control {
    width: 55px;
    min-height: 28px;

    border: none;
    background-color: transparent;

    &--is-focused {
      box-shadow: none;
    }

    &--menu-is-open {
      .Select__dropdown-indicator {
        transform: rotate(-180deg);
      }
    }
  }

  .Select__value-container {
    padding: 0;
    padding-right: 6px;
  }

  .Select__single-value {
    margin: 0;
    text-overflow: clip;
    color: var(--textSecondary);

    svg {
      display: none;
    }
  }

  .Select__indicators {
    color: var(--textSecondary);

    :hover {
      color: var(--textSecondary);
    }
  }

  .Select__indicator {
    padding: 4px 0;
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__dropdown-indicator {
    transition: transform 200ms ease;
    color: var(--textSecondary);
  }

  .Select__menu {
    right: 0;
    width: 180px;
    padding: 8px 0;
    border: 1px solid rgb(228, 231, 233);
    border-radius: 3px;
    box-shadow: 0px 8px 40px 0px #ffffff1f;
    color: var(--text);
  }

  .Select__option {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    transition: color 250ms ease-in-out;

    &:hover {
      cursor: pointer;
      font-weight: 500;
      color: var(--primary);
    }

    svg {
      margin-right: 12px;
    }

    &--is-focused {
      background-color: transparent;

      font-weight: 500;
      color: var(--primary);
    }
    &--is-selected {
      background-color: transparent;

      font-weight: 500;
      color: var(--title);
    }

    &--is-selected::after {
      content: "✔";
      display: block;
      margin-left: auto;

      font-size: 18px;
      color: var(--primary);
    }
  }
`;
