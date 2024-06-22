import { useEffect, useState } from "react";
import { fetch } from "../../../API";

import { Container } from "../../Container/Container";
import { Loader } from "../../Loader/Loader";
import { OtherDeal } from "./OtherDeal";

import { ErrorMessageStyled } from "../../../styles/common";
import { OtherDealsStyled } from "./OtherDeals.styled";

export const OtherDeals = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        const responce = await fetch("?limit=12&skip=149");

        setItems(responce.data.products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, []);

  return (
    <OtherDealsStyled>
      <Container>
        {items.length > 0 && (
          <>
            <OtherDeal
              items={items.slice(0, 3)}
              title={"FLASH SALE TODAY"}
            />
            <OtherDeal
              items={items.slice(3, 6)}
              title={"BEST SELLERS"}
            />
            <OtherDeal
              items={items.slice(6, 9)}
              title={"TOP RATED"}
            />
            <OtherDeal
              items={items.slice(-3)}
              title={"NEW ARRIVAL"}
            />
          </>
        )}
        {error && (
          <ErrorMessageStyled>{error}</ErrorMessageStyled>
        )}
        {loading && <Loader />}
      </Container>
    </OtherDealsStyled>
  );
};
