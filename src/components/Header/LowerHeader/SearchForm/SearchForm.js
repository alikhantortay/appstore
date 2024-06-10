import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { fetch } from "../../../../API";
import { countPrice } from "../../../../countPrice";

import { Loader } from "../../../Loader/Loader";
import { ReactComponent as SearchIcon } from "../../../../icons/header/MagnifyingGlass.svg";

import {
  SearchFormStyled,
  SearchFormWrapper,
  SearchResultsStyled,
  ShowMoreStyled,
} from "./SearchForm.styled";

export const SearchForm = () => {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const search = async () => {
      try {
        setLoading(true);
        if (q.trim() !== "") {
          const responce = await fetch(
            `products/search?q=${q}&skip=0&limit=5`,
          );
          responce.data.products.length > 0
            ? setItems(responce.data.products)
            : setItems([]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    search();
  }, [q]);

  const handleChange = useDebouncedCallback((e) => {
    setQ(e.target.value);
  }, 500);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.elements.input;
    if (value.trim() === "") {
      Notify.failure("Type something!");
    } else {
      navigate(`/shop?q=${value}`, {
        replace: true,
      });
      setQ("");
    }
  };

  return (
    <SearchFormWrapper>
      <SearchFormStyled onSubmit={handleSubmit}>
        <input
          name="input"
          type="text"
          autoComplete="off"
          placeholder="Search for anything..."
          onChange={handleChange}
        />
        <button type="submit">
          <SearchIcon />
        </button>
      </SearchFormStyled>

      {q.length > 2 && useEffect && (
        <SearchResultsStyled>
          {items.length > 0 ? (
            <>
              <ul>
                {items.map(({ id, title, price }) => {
                  return (
                    <li key={id}>
                      <Link
                        to={`details/${id}`}
                        onClick={() => {
                          setQ("");
                        }}>
                        {title}
                        <span>{countPrice(price)}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ShowMoreStyled
                to={`/shop?query=${q}`}
                onClick={() => {
                  setQ("");
                }}>
                Show more results
              </ShowMoreStyled>
            </>
          ) : (
            !loading && <p>Nothing found</p>
          )}
          {error && Notify.failure(error.message)}
          {loading && <Loader />}
        </SearchResultsStyled>
      )}
    </SearchFormWrapper>
  );
};
