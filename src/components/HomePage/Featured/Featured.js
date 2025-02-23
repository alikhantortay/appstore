import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container } from "../../Container/Container";
import { Loader } from "../../Loader/Loader";
import { ReactComponent as ArrowRightIcon } from "../../../icons/ArrowRight.svg";

import {
  ErrorMessageStyled,
  ItemListStyled,
  TitleStyled,
} from "../../../styles/common";

import {
  FeaturedArticleStyled,
  FeaturedEndsStyled,
  FeaturedLinksStyled,
  FeaturedStyled,
  FeaturedTextStyled,
  FeaturedTitleStyled,
  UpperSpanStyled,
} from "./Featured.styled";

const API_URL = "https://appstore.up.railway.app/shop-service/api/public/all-products/get";
const IMAGE_API_URL = "https://appstore.up.railway.app/shop-service/api/public/images/";

export const Featured = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Все продукты");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        console.log("📦 Featured Products:", response.data);

        if (response.data.content && Array.isArray(response.data.content)) {
          setItems(response.data.content);
        } else {
          throw new Error("Ошибка загрузки товаров: Некорректный формат данных");
        }
      } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Фильтрация товаров по категории
  useEffect(() => {
    if (activeCategory === "Все продукты") {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) => item.categoryName === activeCategory));
    }
  }, [items, activeCategory]);

  return (
      <FeaturedStyled>
        <Container>
          {/* 🔥 Блок акции */}
          <FeaturedArticleStyled>
            <div>
              <UpperSpanStyled>COMPUTER & ACCESSORIES</UpperSpanStyled>
              <TitleStyled>15% Discount</TitleStyled>
              <FeaturedTextStyled>For all electronics products</FeaturedTextStyled>
              <FeaturedEndsStyled>
                Offers ends in: <span>EID MUBARAK</span>
              </FeaturedEndsStyled>
            </div>
            <img
                src={require("../../../images/featured.jpeg")}
                alt="Electronic devices"
                width={312}
                height={428}
                loading="lazy"
            />
          </FeaturedArticleStyled>

          {/* 🔥 Заголовок и фильтры */}
          <FeaturedTitleStyled>
            <h2>Рекомендуемые продукты</h2>
            <FeaturedLinksStyled>
              {["Все продукты", "Смартфон", "Ноутбук", "Наушники", "ТВ"].map((category) => (
                  <li key={category}>
                    <button
                        onClick={() => setActiveCategory(category)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: activeCategory === category ? "bold" : "normal",
                          color: activeCategory === category ? "#FF6600" : "#000",
                          borderBottom: activeCategory === category ? "2px solid #FF6600" : "none",
                          paddingBottom: "4px",
                        }}
                    >
                      {category}
                    </button>
                  </li>
              ))}
            </FeaturedLinksStyled>
            <Link to="/shop">
              Просмотреть все продукты
              <ArrowRightIcon />
            </Link>
          </FeaturedTitleStyled>

          {/* 🔥 Список товаров */}
          <ItemListStyled>
            {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                    <li
                        key={item.id}
                        style={{
                          border: "1px solid #ddd",
                          padding: "15px",
                          borderRadius: "8px",
                          textAlign: "center",
                          maxWidth: "220px",
                          position: "relative",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                      <img
                          src={item.imageUrls?.length ? `${IMAGE_API_URL}${encodeURIComponent(item.imageUrls[0])}` : "/placeholder.png"}
                          alt={item.name}
                          style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
                      />
                      {item.isHotProduct && (
                          <span
                              style={{
                                background: "red",
                                color: "white",
                                padding: "5px",
                                borderRadius: "4px",
                                fontSize: "12px",
                                position: "absolute",
                                top: "10px",
                                left: "10px",
                              }}
                          >
                    ГОРЯЧИЙ
                  </span>
                      )}
                      <Link
                          to={`/shop/${item.categoryName}/${item.name}`}
                          style={{
                            textDecoration: "none",
                            color: "#000",
                            fontWeight: "500",
                            fontSize: "15px",
                            display: "block",
                            marginTop: "10px",
                          }}
                      >
                        {item.name}
                      </Link>
                      <strong style={{ color: "#0056B3", fontSize: "14px" }}>
                        {item.price} долларов США
                      </strong>
                    </li>
                ))
            ) : (
                <p style={{ textAlign: "center", fontSize: "18px", color: "#777" }}>
                  Нет товаров в этой категории
                </p>
            )}
          </ItemListStyled>

          {error && <ErrorMessageStyled>{error.message}</ErrorMessageStyled>}
          {loading && <Loader />}
        </Container>
      </FeaturedStyled>
  );
};
