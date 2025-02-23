"use client"

import { useEffect, useState } from "react"
import PropTypes from "prop-types"

export const ShopCategories = ({ selectedCategory, onCategorySelect, selectedPrice, onPriceSelect }) => {
    const [activeCategory, setActiveCategory] = useState(selectedCategory || "")
    const [activePrice, setActivePrice] = useState(selectedPrice || "")

    // Категории товаров
    const categories = [
        { name: "Все товары", value: "" },
        { name: "Computers", value: "Computers" },
        { name: "Смартфоны", value: "Смартфон" },
        { name: "Наушники", value: "Наушники" },
        { name: "Аксессуары", value: "Аксесуары" },
        { name: "Камеры и фото", value: "Камера и фото" },
        { name: "ТВ и Дом", value: "Тв и Дом" }
    ]

    // Диапазоны цен
    const priceRanges = [
        { value: "", label: "Все цены" },
        { value: "0-20", label: "До $20" },
        { value: "25-100", label: "$25 - $100" },
        { value: "100-300", label: "$100 - $300" },
        { value: "300-500", label: "$300 - $500" },
        { value: "500-1000", label: "$500 - $1,000" },
        { value: "1000-100000", label: "$1,000 - $100,000" }
    ]

    // Обновляем активную категорию
    const handleCategoryChange = (event) => {
        const categoryName = event.target.value
        setActiveCategory(categoryName)
        onCategorySelect(categoryName) // Отправляем в родительский компонент
    }

    // Обновляем активный диапазон цен
    const handlePriceChange = (event) => {
        const priceRange = event.target.value
        setActivePrice(priceRange)
        onPriceSelect(priceRange) // Отправляем в родительский компонент
    }

    // Синхронизируем состояние при изменении пропсов (важно при обновлении фильтров)
    useEffect(() => {
        setActiveCategory(selectedCategory || "")
        setActivePrice(selectedPrice || "")
    }, [selectedCategory, selectedPrice])

    return (
        <div className="categories-container">
            {/* Фильтр по категориям */}
            <div className="category-section">
                <h2>Категории</h2>
                <div className="radio-group">
                    {categories.map(({ name, value }) => (
                        <label key={value} className="radio-label">
                            <input
                                type="radio"
                                name="category"
                                value={value}
                                checked={activeCategory === value}
                                onChange={handleCategoryChange}
                            />
                            <span className="radio-custom"></span>
                            <span className="label-text">{name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Фильтр по диапазону цен */}
            <div className="price-section">
                <h2>Диапазон цен</h2>
                <div className="radio-group">
                    {priceRanges.map(({ value, label }) => (
                        <label key={value} className="radio-label">
                            <input
                                type="radio"
                                name="price"
                                value={value}
                                checked={activePrice === value}
                                onChange={handlePriceChange}
                            />
                            <span className="radio-custom"></span>
                            <span className="label-text">{label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .categories-container {
          background: #fff;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          max-width: 300px;
        }

        .category-section,
        .price-section {
          margin-bottom: 32px;
        }

        h2 {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #eee;
        }

        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .radio-label {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 4px 0;
          transition: all 0.2s ease;
        }

        .radio-label:hover {
          color: #0056B3;
        }

        .radio-label input[type="radio"] {
          display: none;
        }

        .radio-custom {
          width: 18px;
          height: 18px;
          border: 2px solid #ddd;
          border-radius: 50%;
          margin-right: 12px;
          position: relative;
          transition: all 0.2s ease;
        }

        .radio-custom:before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background: #0056B3;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.2s ease;
        }

        .radio-label input[type="radio"]:checked + .radio-custom {
          border-color: #0056B3;
        }

        .radio-label input[type="radio"]:checked + .radio-custom:before {
          transform: translate(-50%, -50%) scale(1);
        }

        .label-text {
          font-size: 14px;
          color: #4a4a4a;
          transition: color 0.2s ease;
        }

        .radio-label:hover .label-text {
          color: #0056B3;
        }

        .radio-label input[type="radio"]:checked ~ .label-text {
          color: #0056B3;
          font-weight: 500;
        }
      `}</style>
        </div>
    )
}

ShopCategories.propTypes = {
    selectedCategory: PropTypes.string,
    onCategorySelect: PropTypes.func.isRequired,
    selectedPrice: PropTypes.string,
    onPriceSelect: PropTypes.func.isRequired,
}
