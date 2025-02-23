import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import axios from "axios";
import { Helmet } from "react-helmet-async";

import { Container } from "../../components/Container/Container";
import { Loader } from "../../components/Loader/Loader";
import { ShopCategories } from "../../components/ShopPage/ShopCategories/ShopCategories";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { Pagination } from "../../components/ShopPage/Pagination/Pagination";
import { ReactComponent as ArrowIcon } from "../../icons/ArrowRight.svg";

import { ErrorMessageStyled, ItemListStyled } from "../../styles/common";
import { ShopStyled, ShopTitleStyled } from "./Shop.styled";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [imageCache, setImageCache] = useState({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const width = useWindowWidth();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const page = searchParams.get("page");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  let pageTitle = "Все продукты";
  if (q) {
    pageTitle = `Результаты поиска: "${q}"`;
  } else if (selectedCategory) {
    pageTitle = selectedCategory;
  }

  const apiBaseUrl = "https://appstore.up.railway.app/shop-service/api/public";
  const getImageUrl = (fileName) =>
      fileName ? `${apiBaseUrl}/images/${encodeURIComponent(fileName)}` : "/placeholder.png";

  // 📌 1. Загрузка товаров из API
  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const endpoint = `${apiBaseUrl}/all-products/get`;
        const response = await axios.get(endpoint);
        console.log("API Response:", response.data);

        if (response.data.content && Array.isArray(response.data.content)) {
          const processedItems = response.data.content.map((item) => ({
            ...item,
            photo:
                item.imageUrls && item.imageUrls.length > 0
                    ? imageCache[item.imageUrls[0]] || getImageUrl(item.imageUrls[0])
                    : "/placeholder.png",
          }));

          setItems(processedItems);
          setTotal(response.data.content.length);
        } else {
          throw new Error("Неверный формат данных: content должен быть массивом");
        }
      } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, [q, page]);

  // 📌 2. Загрузка изображений только один раз и обновление кэша
  useEffect(() => {
    const fetchImages = async () => {
      let updatedCache = { ...imageCache };

      const newItems = await Promise.all(
          items.map(async (item) => {
            if (item.imageUrls && item.imageUrls.length > 0) {
              const imageUrl = getImageUrl(item.imageUrls[0]);

              if (!updatedCache[item.imageUrls[0]]) {
                updatedCache[item.imageUrls[0]] = imageUrl;
              }
            }

            return { ...item, photo: updatedCache[item.imageUrls?.[0]] || "/placeholder.png" };
          })
      );

      setImageCache(updatedCache);
      setItems(newItems);
    };

    if (items.length > 0) {
      fetchImages();
    }
  }, [items]);

  // 📌 3. Фильтрация по категории и диапазону цен
  useEffect(() => {
    const allowedCategories = selectedCategory ? [selectedCategory] : null;

    const filtered = items.filter((item) => {
      const matchesCategory = !allowedCategories || allowedCategories.includes(item.categoryName);
      const matchesPrice =
          !selectedPrice ||
          (item.price >= parseInt(selectedPrice.split("-")[0]) &&
              item.price <= parseInt(selectedPrice.split("-")[1]));

      return matchesCategory && matchesPrice;
    });

    setFilteredItems(filtered);
  }, [items, selectedCategory, selectedPrice]);

  return (
      <ShopStyled>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>

        <Container>
          <div>
            {width > 767 && (
                <ShopCategories
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                    selectedPrice={selectedPrice}
                    onPriceSelect={setSelectedPrice}
                />
            )}
          </div>
          <div>
            <ShopTitleStyled>
              <h2>{pageTitle}</h2>
              <p>
                <span>{filteredItems.length}</span> товаров найдено.
              </p>
              {q && (
                  <Link to="/shop">
                    Просмотреть все товары
                    <ArrowIcon />
                  </Link>
              )}
            </ShopTitleStyled>

            <ItemListStyled>
              {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                      <li key={item.id}>
                        <ItemCard item={item} />
                      </li>
                  ))
              ) : (
                  <p>Нет товаров</p>
              )}
            </ItemListStyled>

            {error && <ErrorMessageStyled>{error.message || "Произошла ошибка"}</ErrorMessageStyled>}
            {loading && <Loader />}

            <Pagination total={filteredItems.length} />
          </div>
        </Container>
      </ShopStyled>
  );
};

export default Shop;
