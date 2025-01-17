import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import '../../../global-styles.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        categoryId: '',
        individualCode: '',
        name: '',
        price: '',
        quantity: '',
        description: '',
        liked: false,
        isDeleted: false,
        images: []
    });
    const [specificParams, setSpecificParams] = useState([{ key: '', value: '' }]);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const fetchProducts = async () => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            if (!accessToken) {
                Notify.failure('Токен доступа не найден.');
                return;
            }

            const response = await axios.get(`${apiBaseUrl}/manager/all-products/get`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            setProducts(Array.isArray(response.data) ? response.data : response.data.content || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            Notify.failure('Не удалось получить список продуктов.');
        }
    };

    const fetchCategories = async () => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            if (!accessToken) {
                Notify.failure('Токен доступа не найден.');
                return;
            }

            const response = await axios.get(`${apiBaseUrl}/user/catalogs/get`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            setCategories(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching categories:', error);
            Notify.failure('Не удалось получить список категорий.');
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewProduct(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));
    };

    const handleSpecificParamChange = (index, field, value) => {
        const updatedParams = [...specificParams];
        updatedParams[index][field] = value;
        setSpecificParams(updatedParams);
    };

    const addSpecificParam = () => {
        setSpecificParams([...specificParams, { key: '', value: '' }]);
    };

    const removeSpecificParam = (index) => {
        const updatedParams = specificParams.filter((_, i) => i !== index);
        setSpecificParams(updatedParams);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            if (!accessToken) {
                Notify.failure('Токен доступа не найден.');
                return;
            }

            if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
                Notify.failure('Пожалуйста, заполните все обязательные поля');
                return;
            }

            const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('price', newProduct.price);
            formData.append('quantity', newProduct.quantity);

            const specificParamsObject = {};
            specificParams.forEach(param => {
                if (param.key && param.value) {
                    specificParamsObject[param.key] = param.value;
                }
            });
            formData.append('specificParams', JSON.stringify(specificParamsObject));

            newProduct.images.forEach(image => {
                formData.append('images', image);
            });

            if (newProduct.categoryId) {
                formData.append('categoryId', newProduct.categoryId);
            }
            if (newProduct.individualCode) {
                formData.append('individualCode', newProduct.individualCode);
            }
            if (newProduct.description) {
                formData.append('description', newProduct.description);
            }
            formData.append('liked', newProduct.liked.toString());

            const response = await axios.post(`${apiBaseUrl}/manager/catalogs/${newProduct.categoryId}/product-create`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setProducts([...products, response.data]);

            setNewProduct({
                categoryId: '',
                individualCode: '',
                name: '',
                price: '',
                quantity: '',
                description: '',
                liked: false,
                isDeleted: false,
                images: []
            });
            setSpecificParams([{ key: '', value: '' }]);

            Notify.success('Продукт успешно добавлен');
        } catch (error) {
            console.error('Error adding product:', error);
            Notify.failure('Не удалось добавить продукт');
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (!productId) {
            Notify.failure('Неверный ID продукта');
            return;
        }

        try {
            const accessToken = sessionStorage.getItem('accessToken');
            if (!accessToken) {
                Notify.failure('Токен доступа не найден.');
                return;
            }

            await axios.delete(`${apiBaseUrl}/manager/delete-product/${productId}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            Notify.success('Продукт успешно удален');
        } catch (error) {
            console.error('Error deleting product:', error);
            Notify.failure(`Не удалось удалить продукт: ${error.message}`);
        }
    };

    const handleEditClick = (product) => {
        const specificParamsArray = product.specificParams
            ? Object.entries(product.specificParams).map(([key, value]) => ({ key, value }))
            : [{ key: '', value: '' }];

        setEditingProduct({
            ...product,
            specificParams: specificParamsArray,
            images: [] // Для новых изображений
        });
        setShowEditModal(true);
    };

    const handleEditSpecificParamChange = (index, field, value) => {
        const updatedParams = [...editingProduct.specificParams];
        updatedParams[index][field] = value;
        setEditingProduct({
            ...editingProduct,
            specificParams: updatedParams
        });
    };

    const addEditSpecificParam = () => {
        setEditingProduct({
            ...editingProduct,
            specificParams: [...editingProduct.specificParams, { key: '', value: '' }]
        });
    };

    const removeEditSpecificParam = (index) => {
        const updatedParams = editingProduct.specificParams.filter((_, i) => i !== index);
        setEditingProduct({
            ...editingProduct,
            specificParams: updatedParams
        });
    };

    const handleEditImageChange = (e) => {
        const files = Array.from(e.target.files);
        setEditingProduct(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            if (!accessToken) {
                Notify.failure('Токен доступа не найден.');
                return;
            }

            const formData = new FormData();
            formData.append('name', editingProduct.name);
            formData.append('price', editingProduct.price);
            formData.append('quantity', editingProduct.quantity);

            // Преобразуем специфические параметры в объект
            const specificParamsObject = {};
            editingProduct.specificParams.forEach(param => {
                if (param.key && param.value) {
                    specificParamsObject[param.key] = param.value;
                }
            });
            formData.append('specificParams', JSON.stringify(specificParamsObject));

            // Добавляем новые изображения, если они есть
            editingProduct.images.forEach(image => {
                formData.append('images', image);
            });

            if (editingProduct.categoryId) {
                formData.append('categoryId', editingProduct.categoryId);
            }
            if (editingProduct.description) {
                formData.append('description', editingProduct.description);
            }

            await axios.put(
                `${apiBaseUrl}/manager/product/${editingProduct.id}/update`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            await fetchProducts();
            setShowEditModal(false);
            setEditingProduct(null);
            Notify.success('Продукт успешно обновлен');
        } catch (error) {
            console.error('Error updating product:', error);
            Notify.failure('Не удалось обновить продукт');
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Управление продуктами</h1>

            <div className="card mb-4">
                <div className="card-body">
                    <h2 className="card-title">Добавить новый продукт</h2>
                    <form onSubmit={handleAddProduct}>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Категория</label>
                            <select
                                id="category"
                                className="form-select"
                                value={newProduct.categoryId}
                                onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                                required
                            >
                                <option value="">Выберите категорию</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Название продукта</label>
                            <input
                                id="productName"
                                type="text"
                                className="form-control"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                placeholder="Название продукта"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productPrice" className="form-label">Цена</label>
                            <input
                                id="productPrice"
                                type="number"
                                className="form-control"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                placeholder="Цена продукта"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productQuantity" className="form-label">Количество</label>
                            <input
                                id="productQuantity"
                                type="number"
                                className="form-control"
                                value={newProduct.quantity}
                                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                                placeholder="Количество продукта"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productDescription" className="form-label">Описание</label>
                            <textarea
                                id="productDescription"
                                className="form-control"
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
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
                                        onChange={(e) => handleSpecificParamChange(index, 'key', e.target.value)}
                                        placeholder="Ключ (например, color)"
                                    />
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        value={param.value}
                                        onChange={(e) => handleSpecificParamChange(index, 'value', e.target.value)}
                                        placeholder="Значение (например, черный)"
                                    />
                                    <button type="button" className="btn btn-danger" style={{
                                        backgroundColor:"red", border:"red"}} onClick={() => removeSpecificParam(index)}>Удалить</button>
                                </div>
                            ))}
                            <button type="button" className="btn btn-secondary" style={{backgroundColor:"#0056B3"}} onClick={addSpecificParam}>Добавить параметр</button>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productImages" className="form-label">Изображения</label>
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
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                                    />
                                ))}
                            </div>
                        </div>
                        <button type="submit" className="btn" style={{backgroundColor:"#0056B3"}}>Добавить продукт</button>
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
                                <th>ID</th>
                                <th>Категория</th>
                                <th>Код</th>
                                <th>Название</th>
                                <th>Цена</th>
                                <th>Количество</th>
                                <th>Описание</th>
                                <th>Параметры</th>
                                <th>Изображения</th>
                                <th>Статус</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.categoryId}</td>
                                    <td>{product.individualCode}</td>
                                    <td>{product.name}</td>
                                    <td>${parseFloat(product.price).toFixed(2)}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.description || '-'}</td>
                                    <td>
                                            <pre style={{ fontSize: '12px' }}>
                                                {JSON.stringify(product.specificParams, null, 2)}
                                            </pre>
                                    </td>
                                    <td>
                                        {product.imageUrls?.map((imageUrl, index) => (
                                            <img
                                                key={index}
                                                src={`${apiBaseUrl}${imageUrl}`}
                                                alt={`${product.name} ${index + 1}`}
                                                style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '5px' }}
                                            />
                                        ))}
                                    </td>
                                    <td>{product.isDeleted ? 'Удален' : 'Активен'}</td>

                                    <td>
                                        <button
                                            className="btn btn-sm btn-warning mx-1"
                                            onClick={() => handleEditClick(product)}
                                            style={{
                                                backgroundColor: "#0056B3", border: "#0056B3", marginRight: "10px"
                                            }}
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDeleteProduct(product.id)}
                                            style={{
                                                backgroundColor:"red", border:"red"}}
                                        >
                                            Удалить
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showEditModal && editingProduct && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Редактировать продукт</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowEditModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleUpdateProduct}>
                                    <div className="mb-3">
                                        <label htmlFor="editCategory" className="form-label">Категория</label>
                                        <select
                                            id="editCategory"
                                            className="form-select"
                                            value={editingProduct.categoryId}
                                            onChange={(e) => setEditingProduct({
                                                ...editingProduct,
                                                categoryId: e.target.value
                                            })}
                                        >
                                            <option value="">Выберите категорию</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editProductName" className="form-label">Название продукта</label>
                                        <input
                                            id="editProductName"
                                            type="text"
                                            className="form-control"
                                            value={editingProduct.name}
                                            onChange={(e) => setEditingProduct({
                                                ...editingProduct,
                                                name: e.target.value
                                            })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editProductPrice" className="form-label">Цена</label>
                                        <input
                                            id="editProductPrice"
                                            type="number"
                                            className="form-control"
                                            value={editingProduct.price}
                                            onChange={(e) => setEditingProduct({
                                                ...editingProduct,
                                                price: e.target.value
                                            })}
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editProductQuantity" className="form-label">Количество</label>
                                        <input
                                            id="editProductQuantity"
                                            type="number"
                                            className="form-control"
                                            value={editingProduct.quantity}
                                            onChange={(e) => setEditingProduct({
                                                ...editingProduct,
                                                quantity: e.target.value
                                            })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editProductDescription" className="form-label">Описание</label>
                                        <textarea
                                            id="editProductDescription"
                                            className="form-control"
                                            value={editingProduct.description}
                                            onChange={(e) => setEditingProduct({
                                                ...editingProduct,
                                                description: e.target.value
                                            })}
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Специфические параметры</label>
                                        {editingProduct.specificParams.map((param, index) => (
                                            <div key={index} className="d-flex mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control me-2"
                                                    value={param.key}
                                                    onChange={(e) => handleEditSpecificParamChange(index, 'key', e.target.value)}
                                                    placeholder="Ключ (например, color)"
                                                />
                                                <input
                                                    type="text"
                                                    className="form-control me-2"
                                                    value={param.value}
                                                    onChange={(e) => handleEditSpecificParamChange(index, 'value', e.target.value)}
                                                    placeholder="Значение (например, черный)"
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => removeEditSpecificParam(index)}
                                                    style={{
                                                        backgroundColor:"red", border:"red"}}
                                                >
                                                    Удалить
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            style={{backgroundColor:"#0056B3"}}
                                            onClick={addEditSpecificParam}
                                        >
                                            Добавить параметр
                                        </button>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editProductImages" className="form-label">
                                            Добавить новые изображения
                                        </label>
                                        <input
                                            id="editProductImages"
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
                                                        width: '100px',
                                                        height: '100px',
                                                        objectFit: 'cover',
                                                        marginRight: '10px'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        {editingProduct.imageUrls && (
                                            <div className="mt-2">
                                                <p>Текущие изображения:</p>
                                                {editingProduct.imageUrls.map((imageUrl, index) => (
                                                    <img
                                                        key={index}
                                                        src={`${apiBaseUrl}${imageUrl}`}
                                                        alt={`Текущее изображение ${index + 1}`}
                                                        style={{
                                                            width: '100px',
                                                            height: '100px',
                                                            objectFit: 'cover',
                                                            marginRight: '10px'
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setShowEditModal(false)}
                                        >
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
        </div>
    );
};

export default Products;

