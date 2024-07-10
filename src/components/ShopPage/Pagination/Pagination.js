import PropTypes from "prop-types";
import {
  useParams,
  useSearchParams,
} from "react-router-dom";

import { ReactComponent as ArrowIcon } from "../../../icons/ArrowRight.svg";

import {
  ArrowPageLinkStyled,
  PageLinkStyled,
  PageListStyled,
} from "./Pagination.styled";
import { useWindowWidth } from "../../../hooks/useWindowWidth";

export const Pagination = ({ total }) => {
  const [searchParams] = useSearchParams();
  const { category } = useParams();
  const width = useWindowWidth();

  const current = Number(searchParams.get("page"));
  const q = searchParams.get("q");
  const totalPages = (total / 20).toFixed();

  let pages = [];

  let visiblePages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const getLink = (page) => {
    return `${category ? `/shop/${category}` : ""}${
      q ? `?q=${q}` : ""
    }${q ? "&" : "?"}page=${page}`;
  };

  if (width < 768) {
    visiblePages = pages.slice(
      current > 2 ? current - 2 : 0,
      current > 2 ? current + 1 : 3,
    );
  } else if (width > 767 && width < 1024) {
    visiblePages = pages.slice(
      current > 3 ? current - 3 : 0,
      current > 3 ? current + 2 : 5,
    );
  } else {
    visiblePages = pages;
  }

  if (totalPages > 1)
    return (
      <PageListStyled>
        {current > 1 && (
          <li>
            <ArrowPageLinkStyled
              to={getLink(current - 1)}
              $left>
              <ArrowIcon />
            </ArrowPageLinkStyled>
          </li>
        )}

        {visiblePages.map((page) => (
          <li key={page}>
            <PageLinkStyled
              to={getLink(page)}
              $active={page === current}>
              {page}
            </PageLinkStyled>
          </li>
        ))}

        {current < totalPages && (
          <li>
            <ArrowPageLinkStyled
              to={getLink(current > 0 ? current + 1 : 2)}>
              <ArrowIcon />
            </ArrowPageLinkStyled>
          </li>
        )}
      </PageListStyled>
    );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
};
