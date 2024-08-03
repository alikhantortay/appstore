import { useState, useEffect } from "react";
import {
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { fetch } from "../../API";

import { Container } from "../../components/Container/Container";
import { Loader } from "../../components/Loader/Loader";
import { ShopCategories } from "../../components/ShopPage/ShopCategories/ShopCategories";
import { Tags } from "../../components/Tags/Tags";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { Pagination } from "../../components/ShopPage/Pagination/Pagination";
import { ReactComponent as ArrowIcon } from "../../icons/ArrowRight.svg";

import {
  ErrorMessageStyled,
  ItemListStyled,
} from "../../styles/common";
import { ShopStyled, ShopTitleStyled } from "./Shop.styled";
import { ShopArticle } from "../../components/ShopPage/ShopArticle/ShopArticle";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const width = useWindowWidth();
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const page = searchParams.get("page");

  let pageTitle = "All Products";
  if (q) {
    pageTitle = `You searched "${q}"`;
  } else if (category) {
    pageTitle = category.replaceAll("-", " ");
  } else {
    pageTitle = "All Products";
  }

  useEffect(() => {
    const getItems = async () => {
      try {
        items.length === 0 && setLoading(true);
        const responce = await fetch(
          `${category ? `category/${category}` : ""}${
            q ? `/search?q=${q}` : ""
          }${q ? "&" : "?"}limit=20&skip=${
            page > 1 ? (page - 1) * 20 : 0
          }`,
        );
        setItems(responce.data.products);
        setTotal(responce.data.total);
        window.scrollTo(0, 0);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, [q, category, page, items.length]);

  return (
    <ShopStyled>
      <Container>
        <div>
          {width > 767 && (
            <>
              <ShopCategories />
              <Tags />
            </>
          )}

          <ShopArticle />
        </div>
        <div>
          <ShopTitleStyled>
            <h2>{pageTitle}</h2>
            <p>
              <span>{total}</span> Results found.
            </p>
            {!category && (
              <Link to="/shop">
                Browse All Products
                <ArrowIcon />
              </Link>
            )}
          </ShopTitleStyled>

          <ItemListStyled>
            {items.length > 0 &&
              items.map((item) => {
                return (
                  <li key={item.id}>
                    <ItemCard item={item} />
                  </li>
                );
              })}
          </ItemListStyled>

          {error && (
            <ErrorMessageStyled>
              {error.message}
            </ErrorMessageStyled>
          )}
          {loading && <Loader />}

          <Pagination total={total} />
        </div>
      </Container>
    </ShopStyled>
  );
};

export default Shop;
