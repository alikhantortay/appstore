import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetch } from "../../API";

import { Container } from "../../components/Container/Container";
import { Loader } from "../../components/Loader/Loader";
import { DetailsSwiper } from "../../components/DetailsPage/DetailsSwiper/DetailsSwiper";

import { ErrorMessageStyled } from "../../styles/common";
import { DetailsWrapper } from "./Details.styled";
import { LowerDetails } from "../../components/DetailsPage/LowerDetails/LowerDetails";
import { UpperDetails } from "../../components/DetailsPage/UpperDetails/UpperDetails";

const Details = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItem = async () => {
      try {
        setLoading(true);
        const responce = await fetch(`/${id}6`);
        setItem(responce.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getItem();
  }, [id]);

  console.log(error);
  return (
    <div>
      <Container>
        {item && (
          <DetailsWrapper>
            <DetailsSwiper
              title={item.title}
              images={item.images}
            />
            <UpperDetails item={item} />
          </DetailsWrapper>
        )}

        {item && (
          <LowerDetails
            id={item.id}
            title={item.title}
            category={item.category}
          />
        )}

        {error && (
          <ErrorMessageStyled>
            {error.message}
          </ErrorMessageStyled>
        )}
        {loading && <Loader />}
      </Container>
    </div>
  );
};

export default Details;
