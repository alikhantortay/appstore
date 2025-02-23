import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetch } from "../../API"; // Убедитесь, что fetch корректно обрабатывает API вызовы
import { Helmet } from "react-helmet-async";

import { Loader } from "../../components/Loader/Loader";
import { ErrorMessageStyled } from "../../styles/common";
import UpperDetails from "../../components/DetailsPage/UpperDetails/UpperDetails";
import { LowerDetails } from "../../components/DetailsPage/LowerDetails/LowerDetails";
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
        const response = await fetch(`/product/${id}`);

        if (response?.data) {
          setItem(response.data); // Проверка наличия данных в ответе
        } else {
          throw new Error("Не удалось получить данные товара");
        }
      } catch (error) {
        setError(error.message || "Произошла ошибка при загрузке товара");
      } finally {
        setLoading(false);
      }
    };
    getItem();
  }, [id]);

  return (
      <>
        {item ? (
            <>
              <Helmet>
                <title>{item.title || "Product Details"}</title>
              </Helmet>
              <UpperDetails item={item} />
              <LowerDetails id={item.id} title={item.title} category={item.category} />
            </>
        ) : (
            loading && <Loader />
        )}

        {error && <ErrorMessageStyled>{error}</ErrorMessageStyled>}

        <OtherDeals />
      </>
  );
};

export default Details;
