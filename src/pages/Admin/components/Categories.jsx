import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
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
} from 'react-feather';
import { Container, Card, Form, Button, Table, InputGroup, Modal } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import './Categories.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Функция для конвертации файла в base64-строку (используется при обновлении)
const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: '',
        image: null
    });
    const [editingCategory, setEditingCategory] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedParentId, setSelectedParentId] = useState('');
    const [expandedCategories, setExpandedCategories] = useState(new Set());
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Преобразуем объект, полученный от API, так чтобы:
    // - Если пришло поле imageName, формируем URL для получения фото.
    // - Если есть subCatalogs, маппим его в subcategories.
    const transformCategory = (cat, level = 0) => {
        return {
            ...cat,
            image: cat.imageName ? `${apiBaseUrl}/public/images/${cat.imageName}` : null,
            level,
            subcategories: cat.subCatalogs ? cat.subCatalogs.map(sub => transformCategory(sub, level + 1)) : []
        };
    };

    // Рекурсивное получение каталогов с публичных эндпоинтов
    const fetchCategoriesRecursive = async (categoryId = null, level = 0) => {
        try {
            const endpoint = categoryId
                ? `${apiBaseUrl}/public/catalogs/${categoryId}/get`
                : `${apiBaseUrl}/public/categories`;
            const response = await axios.get(endpoint);
            let cats = response.data;
            cats = Array.isArray(cats) ? cats : [cats];
            // Преобразуем каждый каталог, включая вложенные подкаталоги, если они уже присутствуют в subCatalogs
            return cats.map(cat => transformCategory(cat, level));
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    };

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const cats = await fetchCategoriesRecursive();
            setCategories(cats);
        } catch (error) {
            console.error('Error fetching catalogs:', error);
            Notify.failure('Не удалось получить каталоги.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        setExpandedCategories(new Set());
    }, [categories]);

    // Обработка добавления каталога
    // Для обоих случаев (верхнего каталога и подкаталога) теперь используем FormData (multipart/form-data)
    // Подкаталог отправляется на /manager/under-catalogs/{parentCatalogId}/create
    const handleAddCategory = async (e) => {
        e.preventDefault();
        // Для верхнего каталога обязательно фото, для подкаталога тоже отправляем фото в бинарном виде
        if (!newCategory.name || !newCategory.description || !newCategory.image) {
            Notify.failure('Заполните поля: название, описание и загрузите фото.');
            return;
        }
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            if (!accessToken) {
                Notify.failure('Токен доступа не найден.');
                return;
            }
            const formData = new FormData();
            formData.append('name', newCategory.name);
            formData.append('description', newCategory.description);
            formData.append('image', newCategory.image);

            let response;
            if (selectedParentId) {
                response = await axios.post(
                    `${apiBaseUrl}/manager/under-catalogs/${selectedParentId}/create`,
                    formData,
                    { headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' } }
                );
            } else {
                response = await axios.post(
                    `${apiBaseUrl}/manager/catalogs/create`,
                    formData,
                    { headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' } }
                );
            }
            await fetchCategories();
            setNewCategory({ name: '', description: '', image: null });
            setSelectedParentId('');
            Notify.success('Категория успешно добавлена!');
        } catch (error) {
            console.error('Error adding category:', error);
            Notify.failure('Не удалось добавить категорию.');
        }
    };

    const handleEditClick = (category) => {
        setEditingCategory({
            ...category,
            parentId: category.parentCatalog?.id || ''
        });
        setShowEditModal(true);
    };

    // Обработка обновления каталога через PUT /manager/catalog/{catalogId}/update
    // Если новая картинка не выбрана, отправляем текущее значение поля image (старое фото)
    const handleEditCatalog = async () => {
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            if (!accessToken) {
                Notify.failure("Токен доступа не найден.");
                return;
            }
            const formData = new FormData();
            formData.append("name", editingCategory.name);
            formData.append("description", editingCategory.description);
            // Если пользователь выбрал новую картинку, отправляем её, иначе не добавляем поле image
            if (editingCategory.image instanceof File) {
                formData.append("image", editingCategory.image);
            }
            await axios.put(
                `${apiBaseUrl}/manager/catalog/${editingCategory.id}/update`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            await fetchCategories();
            setShowEditModal(false);
            setEditingCategory(null);
            Notify.success("Категория успешно обновлена");
        } catch (error) {
            console.error("Error updating category:", error);
            Notify.failure("Не удалось обновить категорию");
        }
    };


    const handleDeleteCategory = async (catalogId) => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            if (!accessToken) {
                Notify.failure('Токен доступа не найден.');
                return;
            }
            await axios.delete(`${apiBaseUrl}/manager/catalogs/${catalogId}/delete`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setCategories(prev => {
                const remove = (cats) =>
                    cats.filter(cat => cat.id !== catalogId)
                        .map(cat => ({ ...cat, subcategories: cat.subcategories ? remove(cat.subcategories) : [] }));
                return remove(prev);
            });
            Notify.success('Категория успешно удалена.');
        } catch (error) {
            console.error('Error deleting category:', error);
            Notify.failure('Не удалось удалить категорию.');
        }
    };

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => {
            const next = new Set(prev);
            if (next.has(categoryId)) {
                next.delete(categoryId);
            } else {
                next.add(categoryId);
            }
            return next;
        });
    };

    const getFlattenedCategories = (cats, parentExpanded = true) => {
        let result = [];
        cats.forEach(category => {
            if (!category) return;
            const isExpanded = expandedCategories.has(category.id);
            const matchesSearch = category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.description?.toLowerCase().includes(searchTerm.toLowerCase());
            if (parentExpanded && matchesSearch) {
                result.push(category);
            }
            if (isExpanded && category.subcategories?.length > 0) {
                result = result.concat(getFlattenedCategories(category.subcategories, isExpanded));
            }
        });
        return result;
    };

    const renderCategoryRow = (category, index, level = 0) => {
        if (!category) return null;
        const isExpanded = expandedCategories.has(category.id);
        const hasSubcategories = category.subcategories && category.subcategories.length > 0;
        const indentation = level * 24;
        return (
            <tr key={category.id} className={`category-row ${isExpanded ? 'expanded' : ''}`}>
                <td>{index + 1}</td>
                <td>
                    {category.image ? (
                        <img
                            src={category.image}
                            alt={category.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                    ) : '-'}
                </td>
                <td>
                    <div className="d-flex align-items-center category-name">
                        <div style={{ width: `${indentation}px` }} className="nested-line-container">
                            {level > 0 && <div className="nested-line" />}
                        </div>
                        <button
                            className={`expand-button ${!hasSubcategories ? 'invisible' : ''}`}
                            onClick={() => toggleCategory(category.id)}
                            disabled={!hasSubcategories}
                        >
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                        <span className={`ms-2 ${hasSubcategories ? 'fw-semibold' : ''}`}>
              {category.name}
                            {hasSubcategories && (
                                <span className="category-count">{category.subcategories.length}</span>
                            )}
            </span>
                    </div>
                </td>
                <td>{category.description}</td>
                <td>{category.parentCatalog ? category.parentCatalog.name : 'Нет'}</td>
                <td>
                    <div>
                        <Button
                            size="xs"
                            onClick={() => handleEditClick(category)}
                            style={{ backgroundColor: "#0056B3", border: "#0056B3", marginRight: "10px" }}
                        >
                            Редактировать
                        </Button>
                        <Button
                            size="xs"
                            onClick={() => handleDeleteCategory(category.id)}
                            style={{ backgroundColor: "red", border: "red", marginRight: "10px" }}
                        >
                            Удалить
                        </Button>
                    </div>
                </td>
            </tr>
        );
    };

    const getAllCategories = () => {
        const uniqueIds = new Set();
        return categories.reduce((acc, category) => {
            if (!uniqueIds.has(category.id)) {
                uniqueIds.add(category.id);
                acc.push(category);
            }
            if (category.subcategories) {
                category.subcategories.forEach(sub => {
                    if (!uniqueIds.has(sub.id)) {
                        uniqueIds.add(sub.id);
                        acc.push(sub);
                    }
                });
            }
            return acc;
        }, []);
    };

    const renderCategoriesTable = () => {
        const visibleCategories = getFlattenedCategories(
            categories.filter(cat => !cat.parentCatalog)
        );
        return (
            <Table hover className="categories-table">
                <thead>
                <tr>
                    <th style={{ width: '5%' }}>ID</th>
                    <th style={{ width: '10%' }}>Фото</th>
                    <th style={{ width: '25%' }}>Название</th>
                    <th style={{ width: '25%' }}>Описание</th>
                    <th style={{ width: '15%' }}>Родительский каталог</th>
                    <th style={{ width: '20%' }}>Действия</th>
                </tr>
                </thead>
                <tbody>
                {visibleCategories.map((category, index) => {
                    const level = category.level || 0;
                    return renderCategoryRow(category, index, level);
                })}
                </tbody>
            </Table>
        );
    };

    return (
        <>
            <Helmet>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </Helmet>
            <Container fluid className="py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="page-title">Управление каталогами</h2>
                    <div className="d-flex gap-3">
                        <InputGroup className="search-input">
                            <InputGroup.Text>
                                <Search size={18} />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Поиск каталогов..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                </div>

                <Card className="mb-4 add-category-card">
                    <Card.Body>
                        <Card.Title className="d-flex align-items-center mb-4">
                            <Plus className="me-2" size={20} />
                            Добавить новый каталог
                        </Card.Title>
                        <Form onSubmit={handleAddCategory}>
                            <div className="row">
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="categoryName">
                                        <Form.Label>Название каталога</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={newCategory.name}
                                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                            placeholder="Введите название каталога"
                                            required
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="categoryDescription">
                                        <Form.Label>Описание</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={newCategory.description}
                                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                            placeholder="Введите описание каталога"
                                            required
                                        />
                                    </Form.Group>
                                </div>
                                {/* Отображаем input для фото всегда, чтобы можно было выбрать фото */}
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="categoryImage">
                                        <Form.Label>Фото</Form.Label>
                                        <Form.Control
                                            type="file"
                                            onChange={(e) =>
                                                setNewCategory({ ...newCategory, image: e.target.files[0] })
                                            }
                                            required
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="parentCategory">
                                        <Form.Label>Родительский каталог</Form.Label>
                                        <Form.Select
                                            value={selectedParentId}
                                            onChange={(e) => setSelectedParentId(e.target.value)}
                                        >
                                            <option value="">Без родителя (Верхний уровень)</option>
                                            {getAllCategories().map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </div>
                            <Button type="submit" style={{ backgroundColor: "#0056B3" }} className="w-100 mt-2">
                                <FolderPlus size={18} className="me-2" />
                                Добавить каталог
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Редактировать каталог</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Название каталога</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editingCategory?.name || ''}
                                    onChange={(e) =>
                                        setEditingCategory({ ...editingCategory, name: e.target.value })
                                    }
                                    placeholder="Введите название каталога"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Описание</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editingCategory?.description || ''}
                                    onChange={(e) =>
                                        setEditingCategory({ ...editingCategory, description: e.target.value })
                                    }
                                    placeholder="Введите описание каталога"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Фото</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) =>
                                        setEditingCategory({ ...editingCategory, image: e.target.files[0] })
                                    }
                                />
                                {editingCategory?.image && !(editingCategory.image instanceof File) && (
                                    <img
                                        src={editingCategory.image}
                                        alt={editingCategory.name}
                                        style={{ width: '100px', marginTop: '10px' }}
                                    />
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Родительский каталог</Form.Label>
                                <Form.Select
                                    value={editingCategory?.parentId || ''}
                                    onChange={(e) => setEditingCategory({ ...editingCategory, parentId: e.target.value })}
                                >
                                    <option value="">Без родителя (Верхний уровень)</option>
                                    {getAllCategories()
                                        .filter(cat => cat.id !== editingCategory?.id)
                                        .map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            <X size={14} className="me-1" />
                            Отмена
                        </Button>
                        <Button variant="primary" onClick={handleEditCatalog}>
                            <Save size={14} className="me-1" />
                            Сохранить изменения
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Card className="categories-list-card">
                    <Card.Body>
                        <Card.Title className="mb-4">Список каталогов</Card.Title>
                        {isLoading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Загрузка...</span>
                                </div>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                {renderCategoriesTable()}
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default Categories;
