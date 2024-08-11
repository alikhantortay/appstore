import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetch } from "../../API";
import { Helmet } from "react-helmet-async";

import { Loader } from "../../components/Loader/Loader";

import { ErrorMessageStyled } from "../../styles/common";
import { LowerDetails } from "../../components/DetailsPage/LowerDetails/LowerDetails";
import { UpperDetails } from "../../components/DetailsPage/UpperDetails/UpperDetails";
import { OtherDeals } from "../../components/HomePage/OtherDeals/OtherDeals";

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
        const responce = await fetch(`/${id}`);
        setItem(responce.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getItem();
  }, [id]);

  return (
    <>
      {item && (
        <>
          <Helmet>
            <title>{item.title || "Product Details"}</title>
          </Helmet>
          <UpperDetails item={item} />
          <LowerDetails
            id={item.id}
            title={item.title}
            category={item.category}
          />
        </>
      )}
      {error && (
        <ErrorMessageStyled>
          {error.message}
        </ErrorMessageStyled>
      )}
      {loading && <Loader />}
      <OtherDeals />
    </>
  );
};

export default Details;
