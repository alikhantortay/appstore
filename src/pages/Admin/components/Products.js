import React, { useState, useEffect } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axios from "axios";
import {
    FolderPlus,
    Trash2,
    Edit3,
    ChevronDown,
    ChevronRight,
    Plus,
    Search,
    Save,
    X
} from "react-feather";
import { Container, Card, Form, Button, Table, InputGroup, Modal, ListGroup } from "react-bootstrap";
import { Helmet } from "react-helmet";
import "../../../global-styles.css";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [detailsProduct, setDetailsProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        categoryId: "",
        individualCode: "",
        name: "",
        price: "",
        quantity: "",
        description: "",
        liked: false,
        isDeleted: false,
        images: [],
        isHotProduct: false,
    });
    const [specificParams, setSpecificParams] = useState([{ key: "", value: "" }]);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Получение продуктов
    const fetchProducts = async () => {
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            if (!accessToken) {
                Notify.failure("Токен доступа не найден.");
                return;
            }
            const response = await axios.get(`${apiBaseUrl}/public/all-products/get`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setProducts(
                Array.isArray(response.data)
                    ? response.data
                    : response.data.content || []
            );
        } catch (error) {
            console.error("Error fetching products:", error);
            Notify.failure("Не удалось получить список продуктов.");
        }
    };

    // Получение категорий – публичный эндпоинт
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/public/categories`);
            setCategories(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching categories:", error);
            Notify.failure("Не удалось получить список категорий.");
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // Функция для получения URL изображения
    const getImageUrl = (fileName) => `${apiBaseUrl}/api/public/images/${fileName}`;

    // Оптимизированная загрузка изображений для всех продуктов
    const [imageUrls, setImageUrls] = useState({});
    useEffect(() => {
        const loadImages = async () => {
            const urls = {};
            await Promise.all(
                products.map(async (product) => {
                    if (product.imageUrls && product.imageUrls.length > 0) {
                        const url = await fetchImageWithAuth(product.imageUrls[0]);
                        urls[product.id] = url;
                    }
                })
            );
            setImageUrls(urls);
        };
        if (products.length > 0) {
            loadImages();
        }
    }, [products]);

    const fetchImageWithAuth = async (fileName) => {
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            if (!accessToken) {
                console.error("Токен доступа не найден.");
                return "/placeholder.png";
            }
            const response = await fetch(
                `${apiBaseUrl}/public/images/${encodeURIComponent(fileName)}`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            if (!response.ok) {
                console.error("Ошибка загрузки изображения:", response.status);
                return "/placeholder.png";
            }
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error("Ошибка при загрузке изображения:", error);
            return "/placeholder.png";
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewProduct((prev) => ({
            ...prev,
            images: [...prev.images, ...files],
        }));
    };

    const handleSpecificParamChange = (index, field, value) => {
        const updatedParams = [...specificParams];
        updatedParams[index][field] = value;
        setSpecificParams(updatedParams);
    };

    const addSpecificParam = () => {
        setSpecificParams([...specificParams, { key: "", value: "" }]);
    };

    const removeSpecificParam = (index) => {
        const updatedParams = specificParams.filter((_, i) => i !== index);
        setSpecificParams(updatedParams);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            if (!accessToken) {
                Notify.failure("Токен доступа не найден.");
                return;
            }
            if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
                Notify.failure("Пожалуйста, заполните все обязательные поля");
                return;
            }
            const formData = new FormData();
            formData.append("name", newProduct.name);
            formData.append("price", newProduct.price);
            formData.append("quantity", newProduct.quantity);

            const specificParamsObject = {};
            specificParams.forEach((param) => {
                if (param.key && param.value) {
                    specificParamsObject[param.key] = param.value;
                }
            });
            formData.append("specificParams", JSON.stringify(specificParamsObject));

            newProduct.images.forEach((image) => {
                formData.append("images", image);
            });

            if (newProduct.categoryId) {
                formData.append("categoryId", newProduct.categoryId);
            }
            if (newProduct.individualCode) {
                formData.append("individualCode", newProduct.individualCode);
            }
            if (newProduct.description) {
                formData.append("description", newProduct.description);
            }
            formData.append("liked", newProduct.liked.toString());
            formData.append("isHotProduct", newProduct.isHotProduct.toString());

            const response = await axios.post(
                `${apiBaseUrl}/manager/catalogs/${newProduct.categoryId}/product-create`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setProducts([...products, response.data]);

            setNewProduct({
                categoryId: "",
                individualCode: "",
                name: "",
                price: "",
                quantity: "",
                description: "",
                liked: false,
                isDeleted: false,
                images: [],
                isHotProduct: false,
            });
            setSpecificParams([{ key: "", value: "" }]);

            Notify.success("Продукт успешно добавлен");
        } catch (error) {
            console.error("Error adding product:", error);
            Notify.failure("Не удалось добавить продукт");
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (!productId) {
            Notify.failure("Неверный ID продукта");
            return;
        }
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            if (!accessToken) {
                Notify.failure("Токен доступа не найден.");
                return;
            }
            await axios.put(`${apiBaseUrl}/manager/delete-product/${productId}`, null, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            Notify.success("Продукт успешно удален");
        } catch (error) {
            console.error("Error deleting product:", error.response?.data || error.message);
            Notify.failure(`Не удалось удалить продукт: ${error.message}`);
        }
    };

    const renderSpecificParams = (params) => {
        if (!params || typeof params !== "object") return <span>-</span>;
        const entries = Object.entries(params);
        if (entries.length === 0) return <span>-</span>;
        return (
            <ul style={{ margin: 0, paddingLeft: "15px" }}>
                {entries.map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}:</strong> {value}
                    </li>
                ))}
            </ul>
        );
    };

    const handleEditClick = (product) => {
        const specificParamsArray = product.specificParams
            ? Object.entries(product.specificParams).map(([key, value]) => ({ key, value }))
            : [{ key: "", value: "" }];

        setEditingProduct({
            ...product,
            specificParams: specificParamsArray,
            images: [],
            imageUrls: product.imageUrls || [],
            deletedImageUrls: [],
        });
        setShowEditModal(true);
    };


    const handleEditSpecificParamChange = (index, field, value) => {
        const updatedParams = [...editingProduct.specificParams];
        updatedParams[index][field] = value;
        setEditingProduct({
            ...editingProduct,
            specificParams: updatedParams,
        });
    };

    const addEditSpecificParam = () => {
        setEditingProduct({
            ...editingProduct,
            specificParams: [...editingProduct.specificParams, { key: "", value: "" }],
        });
    };

    const removeEditSpecificParam = (index) => {
        const updatedParams = editingProduct.specificParams.filter((_, i) => i !== index);
        setEditingProduct({
            ...editingProduct,
            specificParams: updatedParams,
        });
    };

    const handleEditImageChange = (e) => {
        const files = Array.from(e.target.files);
        setEditingProduct((prev) => ({
            ...prev,
            images: [...prev.images, ...files],
        }));
    };

    const handleDeleteCurrentImage = (imageUrl, indexToDelete) => {
        setEditingProduct((prev) => ({
            ...prev,
            imageUrls: prev.imageUrls.filter((_, index) => index !== indexToDelete),
            deletedImageUrls: [...prev.deletedImageUrls, imageUrl],
        }));
    };



    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            if (!accessToken) {
                Notify.failure("Токен доступа не найден.");
                return;
            }

            const formData = new FormData();

            // Обязательные поля
            formData.append("name", editingProduct.name);
            formData.append("price", editingProduct.price);
            formData.append("quantity", editingProduct.quantity);

            // Преобразуем специфические параметры обратно в объект
            const specificParamsObject = {};
            editingProduct.specificParams.forEach((param) => {
                if (param.key && param.value) {
                    specificParamsObject[param.key] = param.value;
                }
            });
            formData.append("specificParams", JSON.stringify(specificParamsObject));

            // Новые загружаемые файлы
            editingProduct.images.forEach((image) => {
                formData.append("images", image);
            });

            // Категория, описание, горячий продукт
            if (editingProduct.categoryId) {
                formData.append("categoryId", editingProduct.categoryId);
            }
            if (editingProduct.description) {
                formData.append("description", editingProduct.description);
            }
            formData.append("isHotProduct", editingProduct.isHotProduct.toString());

            // Если продукт «удалён» (статус), добавим это в formData
            formData.append("isDeleted", editingProduct.isDeleted.toString());

            // Оставшиеся существующие изображения
            if (editingProduct.imageUrls && editingProduct.imageUrls.length > 0) {
                formData.append("existingImageUrls", JSON.stringify(editingProduct.imageUrls));
            }

            // Список удалённых изображений
            if (editingProduct.deletedImageUrls && editingProduct.deletedImageUrls.length > 0) {
                formData.append("deletedImageUrls", JSON.stringify(editingProduct.deletedImageUrls));
            }

            await axios.put(
                `${apiBaseUrl}/manager/product/${editingProduct.id}/update`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // После успешного обновления можно заново загрузить список продуктов
            await fetchProducts();

            // Закрываем модалку
            setShowEditModal(false);
            setEditingProduct(null);
            Notify.success("Продукт успешно обновлен");
        } catch (error) {
            console.error("Error updating product:", error);
            Notify.failure("Не удалось обновить продукт");
        }
    };


    const handleDetailsClick = (product) => {
        setDetailsProduct(product);
        setShowDetailsModal(true);
    };

    const renderCategoryOptions = () => {
        return categories.map((category) => (
            <option key={category.id} value={category.id}>
                {category.name}
            </option>
        ));
    };

    return (
        <div className="mt-4">
            <h1 className="mb-4">Управление продуктами</h1>

            <div className="card mb-4">
                <div className="card-body">
                    <h2 className="card-title">Добавить новый продукт</h2>
                    <form onSubmit={handleAddProduct}>
                        {/* Форма добавления продукта */}
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                Категория
                            </label>
                            <select
                                id="category"
                                className="form-select"
                                value={newProduct.categoryId}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, categoryId: e.target.value })
                                }
                                required
                            >
                                <option value="">Выберите категорию</option>
                                {renderCategoryOptions()}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">
                                Название продукта
                            </label>
                            <input
                                id="productName"
                                type="text"
                                className="form-control"
                                value={newProduct.name}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, name: e.target.value })
                                }
                                placeholder="Название продукта"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productPrice" className="form-label">
                                Цена
                            </label>
                            <input
                                id="productPrice"
                                type="number"
                                className="form-control"
                                value={newProduct.price}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, price: e.target.value })
                                }
                                placeholder="Цена продукта"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productQuantity" className="form-label">
                                Количество
                            </label>
                            <input
                                id="productQuantity"
                                type="number"
                                className="form-control"
                                value={newProduct.quantity}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, quantity: e.target.value })
                                }
                                placeholder="Количество продукта"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productDescription" className="form-label">
                                Описание
                            </label>
                            <textarea
                                id="productDescription"
                                className="form-control"
                                value={newProduct.description}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, description: e.target.value })
                                }
                                placeholder="Описание продукта"
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Специфические параметры</label>
                            {specificParams.map((param, index) => (
                                <div key={index} className="d-flex mb-2">
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        value={param.key}
                                        onChange={(e) =>
                                            handleSpecificParamChange(index, "key", e.target.value)
                                        }
                                        placeholder="Ключ (например, color)"
                                    />
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        value={param.value}
                                        onChange={(e) =>
                                            handleSpecificParamChange(index, "value", e.target.value)
                                        }
                                        placeholder="Значение (например, черный)"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        style={{ backgroundColor: "red", border: "red" }}
                                        onClick={() => removeSpecificParam(index)}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-secondary"
                                style={{ backgroundColor: "#0056B3" }}
                                onClick={addSpecificParam}
                            >
                                Добавить параметр
                            </button>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productImages" className="form-label">
                                Изображения
                            </label>
                            <input
                                id="productImages"
                                type="file"
                                className="form-control"
                                onChange={handleImageChange}
                                multiple
                                accept="image/*"
                            />
                            <div className="mt-2">
                                {newProduct.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(image) || "/placeholder.svg"}
                                        alt={`Предпросмотр ${index + 1}`}
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                            marginRight: "10px",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="isHotProduct"
                                checked={newProduct.isHotProduct}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, isHotProduct: e.target.checked })
                                }
                            />
                            <label className="form-check-label" htmlFor="isHotProduct">
                                Горячий продукт
                            </label>
                        </div>
                        <button type="submit" className="btn" style={{ backgroundColor: "#0056B3" }}>
                            Добавить продукт
                        </button>
                    </form>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Список продуктов</h2>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                {/* Убраны поля ID и Описание */}
                                <th>Код</th>
                                <th>Название</th>
                                <th>Цена</th>
                                <th>Количество</th>
                                <th>Параметры</th>
                                <th>Изображение</th>
                                <th>Статус</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product) => {
                                // Если удалён, задаём фон для строки
                                const rowStyle = product.isDeleted
                                    ? { backgroundColor: "#f8d7da" } // Розоватый цвет (аналог table-danger)
                                    : {};


                                return (
                                    <tr key={product.id} style={rowStyle}>
                                        <td>{product.individualCode}</td>
                                        <td>{product.name}</td>
                                        <td>${Number.parseFloat(product.price).toFixed(2)}</td>
                                        <td>{product.quantity}</td>
                                        <td>{renderSpecificParams(product.specificParams)}</td>
                                        <td>
                                            {imageUrls[product.id] ? (
                                                <img
                                                    src={imageUrls[product.id]}
                                                    alt="Первое изображение"
                                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                />
                                            ) : (
                                                <span>Изображение отсутствует</span>
                                            )}
                                        </td>
                                        <td>
                                            {product.isDeleted ? (
                                                <span className="badge bg-danger">Удален</span>
                                            ) : (
                                                <span className="badge bg-success">Активен</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn"
                                                    style={{
                                                        backgroundColor: "#0056B3",
                                                        color: "#fff",
                                                        borderColor: "#0056B3",
                                                    }}
                                                    onClick={() => handleEditClick(product)}
                                                >
                                                    Редактировать
                                                </button>
                                                <button
                                                    className="btn"
                                                    style={{
                                                        backgroundColor: "#17a2b8",
                                                        color: "#fff",
                                                        borderColor: "#17a2b8",
                                                    }}
                                                    onClick={() => handleDetailsClick(product)}
                                                >
                                                    Подробности
                                                </button>
                                                <button
                                                    className="btn"
                                                    style={
                                                        product.isDeleted
                                                            ? {
                                                                backgroundColor: "gray",
                                                                color: "#fff",
                                                                borderColor: "gray",
                                                                cursor: "not-allowed",
                                                            }
                                                            : { backgroundColor: "red", color: "#fff", borderColor: "red" }
                                                    }
                                                    onClick={() => !product.isDeleted && handleDeleteProduct(product.id)}
                                                    disabled={product.isDeleted}
                                                >
                                                    Удалить
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            {showEditModal && editingProduct && (
                <div className="modal" tabIndex="-1" role="dialog" style={{display: "block"}}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Редактировать продукт</h5>
                                <button type="button" className="btn-close"
                                        onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleUpdateProduct}>
                                    {/* Форма редактирования (аналогична форме добавления) */}
                                    <div className="mb-3">
                                        <label htmlFor="editCategory" className="form-label">
                                            Категория
                                        </label>
                                        <select
                                            id="editCategory"
                                            className="form-select"
                                            value={editingProduct.categoryId}
                                            onChange={(e) =>
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    categoryId: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">Выберите категорию</option>
                                            {renderCategoryOptions()}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editProductName" className="form-label">
                                            Название продукта
                                        </label>
                                        <input
                                            id="editProductName"
                                            type="text"
                                            className="form-control"
                                            value={editingProduct.name}
                                            onChange={(e) =>
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    name: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editProductPrice" className="form-label">
                                            Цена
                                        </label>
                                        <input
                                            id="editProductPrice"
                                            type="number"
                                            className="form-control"
                                            value={editingProduct.price}
                                            onChange={(e) =>
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    price: e.target.value,
                                                })
                                            }
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editProductQuantity" className="form-label">
                                            Количество
                                        </label>
                                        <input
                                            id="editProductQuantity"
                                            type="number"
                                            className="form-control"
                                            value={editingProduct.quantity}
                                            onChange={(e) =>
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    quantity: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editProductDescription" className="form-label">
                                            Описание
                                        </label>
                                        <textarea
                                            id="editProductDescription"
                                            className="form-control"
                                            value={editingProduct.description}
                                            onChange={(e) =>
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    description: e.target.value,
                                                })
                                            }
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editProductStatus" className="form-label">
                                            Статус
                                        </label>
                                        <select
                                            id="editProductStatus"
                                            className="form-select"
                                            value={editingProduct.isDeleted ? "deleted" : "active"}
                                            onChange={(e) =>
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    isDeleted: e.target.value === "deleted",
                                                })
                                            }
                                        >
                                            <option value="active">Активен</option>
                                            <option value="deleted">Удален</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Специфические параметры</label>
                                        {editingProduct.specificParams.map((param, index) => (
                                            <div key={index} className="d-flex mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control me-2"
                                                    value={param.key}
                                                    onChange={(e) => handleEditSpecificParamChange(index, "key", e.target.value)}
                                                    placeholder="Ключ (например, color)"
                                                />
                                                <input
                                                    type="text"
                                                    className="form-control me-2"
                                                    value={param.value}
                                                    onChange={(e) => handleEditSpecificParamChange(index, "value", e.target.value)}
                                                    placeholder="Значение (например, черный)"
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => removeEditSpecificParam(index)}
                                                    style={{backgroundColor: "red", border: "red"}}
                                                >
                                                    Удалить
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            style={{backgroundColor: "#0056B3"}}
                                            onClick={addEditSpecificParam}
                                        >
                                            Добавить параметр
                                        </button>
                                    </div>
                                    {/* Текущие изображения */}
                                    <div className="mb-3">
                                        <label htmlFor="editProductImages" className="form-label">
                                            Текущие изображения
                                        </label>
                                        {editingProduct.imageUrls && editingProduct.imageUrls.length > 0 ? (
                                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                                {editingProduct.imageUrls.map((imageUrl, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            position: "relative",
                                                            marginRight: "10px",
                                                            marginBottom: "10px",
                                                        }}
                                                    >
                                                        <img
                                                            src={`${apiBaseUrl}/public/images/${imageUrl}`}
                                                            alt={`Изображение ${index + 1}`}
                                                            style={{
                                                                width: "100px",
                                                                height: "100px",
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            style={{
                                                                position: "absolute",
                                                                top: 0,
                                                                right: 0,
                                                                backgroundColor: "red",
                                                                border: "none",
                                                                color: "white",
                                                                borderRadius: "50%",
                                                                width: "20px",
                                                                height: "20px",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => handleDeleteCurrentImage(imageUrl, index)}
                                                        >
                                                            X
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span>Изображения отсутствуют</span>
                                        )}
                                    </div>

                                    {/* Добавить новые изображения */}
                                    <div className="mb-3">
                                        <label htmlFor="editProductImagesNew" className="form-label">
                                            Добавить новые изображения
                                        </label>
                                        <input
                                            id="editProductImagesNew"
                                            type="file"
                                            className="form-control"
                                            onChange={handleEditImageChange}
                                            multiple
                                            accept="image/*"
                                        />
                                        <div className="mt-2">
                                            {editingProduct.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={URL.createObjectURL(image) || "/placeholder.svg"}
                                                    alt={`Предпросмотр ${index + 1}`}
                                                    style={{
                                                        width: "100px",
                                                        height: "100px",
                                                        objectFit: "cover",
                                                        marginRight: "10px",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="editIsHotProduct"
                                            checked={editingProduct.isHotProduct}
                                            onChange={(e) =>
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    isHotProduct: e.target.checked,
                                                })
                                            }
                                        />
                                        <label className="form-check-label" htmlFor="editIsHotProduct">
                                            Горячий продукт
                                        </label>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                onClick={() => setShowEditModal(false)}>
                                            Отмена
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Сохранить изменения
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Modal
                show={showDetailsModal && detailsProduct}
                onHide={() => setShowDetailsModal(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Подробности о продукте</Modal.Title>
                </Modal.Header>
                {detailsProduct && (
                    <Modal.Body>
                        <div className="row">
                            {/* Левая колонка: изображения */}
                            <div className="col-md-5">
                                {detailsProduct.imageUrls && detailsProduct.imageUrls.length > 0 ? (
                                    <div className="d-flex flex-wrap">
                                        {detailsProduct.imageUrls.map((img, index) => (
                                            <div key={index} className="m-1">
                                                <img
                                                    src={`${apiBaseUrl}/public/images/${img}`}
                                                    alt={`Изображение ${index + 1}`}
                                                    style={{
                                                        width: "100%",
                                                        maxWidth: "180px",
                                                        height: "auto",
                                                        objectFit: "cover",
                                                        borderRadius: "5px",
                                                        border: "1px solid #ccc",
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted">Изображения отсутствуют</p>
                                )}
                            </div>

                            {/* Правая колонка: текстовые данные */}
                            <div className="col-md-7 mt-3 mt-md-0">
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <strong>Код:</strong> {detailsProduct.individualCode || "—"}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Название:</strong> {detailsProduct.name}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Категория:</strong>{" "}
                                        {detailsProduct.categoryName ||
                                            (categories.find(cat => cat.id === detailsProduct.categoryId)?.name || "—")}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Цена:</strong>{" "}
                                        ${Number.parseFloat(detailsProduct.price).toFixed(2)}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Количество:</strong> {detailsProduct.quantity}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Статус:</strong>{" "}
                                        {detailsProduct.isDeleted ? "Удален" : "Активен"}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Специфические параметры:</strong>
                                        {renderSpecificParams(detailsProduct.specificParams)}
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                        </div>
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Products;
