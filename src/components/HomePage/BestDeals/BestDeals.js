import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

const API_URL = "https://appstore.up.railway.app/shop-service/api/public/all-products/get";
const API_IMAGE_BASE = "https://appstore.up.railway.app/shop-service/api/public/images/";

export const BestDeals = () => {
  const [hot, setHot] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHotProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(API_URL);
        console.log("🔥 Hot Products Response:", response.data);

        if (response.data?.content && Array.isArray(response.data.content)) {
          // Фильтруем только товары с `isHotProduct: true`
          const hotItems = response.data.content.filter(item => item.isHotProduct);

          if (hotItems.length > 0) {
            const firstHotItem = hotItems[0]; // Первый товар - как "горячая сделка"
            setHot(firstHotItem);
            setItems(hotItems.slice(1)); // Остальные - в общий список
          }
        } else {
          throw new Error("Неверный формат данных: `content` должен быть массивом");
        }
      } catch (error) {
        console.error("❌ Ошибка загрузки горячих предложений:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getHotProducts();
  }, []);

  return (
      <BestDealsStyled>
        <Container>
          <BestDealsTitlesStyled>
            <h2>🔥 Лучшие предложения</h2>
            <Link to="/shop">
              Посмотреть все продукты
              <ArrowRightIcon />
            </Link>
          </BestDealsTitlesStyled>

          <BestDealsGridContainer>
            {/* Показываем первый товар как "горячую сделку" */}
            {hot && <Hot hot={hot} />}

            {/* Остальные горячие товары */}
            {items.length > 0 &&
                items.map((item) => (
                    <li key={item.id}>
                      <ItemCard item={item} bestDeals />
                    </li>
                ))}
          </BestDealsGridContainer>

          {error && <ErrorMessageStyled>{error.message}</ErrorMessageStyled>}
          {loading && <Loader />}
        </Container>
      </BestDealsStyled>
  );
};
