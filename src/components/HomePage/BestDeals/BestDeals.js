import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetch } from "../../../API";
import { deals } from "./deals";

import { Container } from "../../Container/Container";
import { Hot } from "./Hot/Hot";
import { Loader } from "../../Loader/Loader";
import { BestDealsTimer } from "./BestDealsTimer";
import { ItemCard } from "../../ItemCard/ItemCard";
import { ReactComponent as ArrowRightIcon } from "../../../icons/ArrowRight.svg";

import { ErrorMessageStyled } from "../../../styles/common";
import {
  BestDealsStyled,
  BestDealsGridContainer,
  BestDealsTitlesStyled,
} from "./BestDeals.styled";

export const BestDeals = () => {
  const [hot, setHot] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    deals.forEach((id) => {
      const getItem = async () => {
        try {
          setLoading(true);
          const responce = await fetch(`/${id}`);
          responce.data.id === 80
            ? setHot(responce.data)
            : setItems((prevState) => [
                ...prevState,
                responce.data,
              ]);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      getItem();
    });
  }, []);

  return (
    <BestDealsStyled>
      <Container>
        <BestDealsTitlesStyled>
          <h2>Best Deals</h2>
          <p>Deals ends in</p>
          <BestDealsTimer />
          <Link to="/shop">
            Browse All Products
            <ArrowRightIcon />
          </Link>
        </BestDealsTitlesStyled>

        <BestDealsGridContainer>
          {hot && <Hot hot={hot} />}
          {items.length > 0 &&
            items.map((item) => (
              <li key={item.id}>
                <ItemCard item={item} bestDeals />
              </li>
            ))}
        </BestDealsGridContainer>
        {error && (
          <ErrorMessageStyled>
            {error.message}
          </ErrorMessageStyled>
        )}
        {loading && <Loader />}
      </Container>
    </BestDealsStyled>
  );
};
