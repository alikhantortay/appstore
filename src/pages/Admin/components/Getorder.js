"use client"

import { useState, useEffect, useCallback } from "react"
import { Notify } from "notiflix/build/notiflix-notify-aio"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css" // Импорт Bootstrap стилей
import "./Getorder.css" // Дополнительные стили, если нужны
import "./modal.css" // Import the new modal styles

const GetOrder = () => {
    const [orders, setOrders] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

    // Получение всех заказов
    const fetchOrders = useCallback(async () => {
        try {
            const accessToken = sessionStorage.getItem("accessToken")
            if (!accessToken) {
                Notify.failure("Токен доступа не найден.")
                return
            }

            const response = await axios.get(`${apiBaseUrl}/admin/orders/all`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })

            setOrders(response.data)
        } catch (error) {
            console.error("Ошибка при получении заказов:", error)
            Notify.failure("Не удалось получить список заказов.")
        }
    }, [apiBaseUrl])

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    // Фильтрация заказов по любому полю
    const filteredOrders = orders.filter((order) => {
        // Собираем все поля заказа (кроме items)
        let searchableText = ""
        Object.entries(order).forEach(([key, value]) => {
            if (key !== "items") {
                searchableText += String(value).toLowerCase() + " "
            }
        })
        // Добавляем данные товаров в строку поиска
        if (order.items && order.items.length > 0) {
            order.items.forEach((item) => {
                searchableText +=
                    (item.name ? String(item.name).toLowerCase() + " " : "") +
                    (item.quantity ? String(item.quantity).toLowerCase() + " " : "")
            })
        }
        return searchableText.includes(searchTerm.toLowerCase())
    })

    // Открыть модалку с подробностями
    const openModal = (order) => {
        setSelectedOrder(order)
        setShowModal(true)
    }

    // Закрыть модалку
    const closeModal = () => {
        setSelectedOrder(null)
        setShowModal(false)
    }

    // Render the modal
    const renderModal = () => {
        if (!showModal || !selectedOrder) return null

        return (
            <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h5 className="modal-title">Детали заказа #{selectedOrder.orderId}</h5>
                        <button className="close-button" onClick={closeModal}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>
                            <strong>Дата Заказа:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}
                        </p>
                        <p>
                            <strong>Статус:</strong> {selectedOrder.status}
                        </p>
                        <p>
                            <strong>Общая Цена:</strong> {selectedOrder.totalPrice}
                        </p>
                        <p>
                            <strong>Имя:</strong> {selectedOrder.firstname}
                        </p>
                        <p>
                            <strong>Город:</strong> {selectedOrder.city}
                        </p>
                        <p>
                            <strong>Страна:</strong> {selectedOrder.country}
                        </p>
                        <h5>Товары:</h5>
                        {selectedOrder.items && selectedOrder.items.length > 0 ? (
                            <ul>
                                {selectedOrder.items.map((item, index) => (
                                    <li key={index}>{item.name}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Нет товаров</p>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="mt-4">
            <div className="row mb-3">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Поиск по всем полям..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {filteredOrders.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="thead-light">
                        <tr>
                            {/* Оставляем только нужные столбцы */}
                            <th>ID Заказа</th>
                            <th>Дата Заказа</th>
                            <th>Статус</th>
                            <th>Общая Цена</th>
                            <th>Имя</th>
                            <th>Город</th>
                            <th>Страна</th>
                            <th style={{ minWidth: "200px" }}>Товары</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{new Date(order.orderDate).toLocaleString()}</td>
                                <td>{order.status}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.firstname}</td>
                                <td>{order.city}</td>
                                <td>{order.country}</td>
                                <td style={{ minWidth: "200px" }}>
                                    {order.items && order.items.length > 0 ? (
                                        <ul className="list-unstyled">
                                            {order.items.map((item, index) => (
                                                <li key={index}>
                                                    {/* Оставляем только название и количество */}
                                                    {item.name}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "Нет товаров"
                                    )}
                                </td>
                                <td>
                                    <button className="btn btn-primary btn-sm" onClick={() => openModal(order)}>
                                        Подробности
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center">Заказы отсутствуют</p>
            )}

            {/* Replace the previous modal code with the new renderModal function */}
            {renderModal()}
        </div>
    )
}

export default GetOrder

