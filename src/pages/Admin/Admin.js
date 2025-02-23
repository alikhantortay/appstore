import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Categories from "./components/Categories";
import Employees from "./components/Employees";
import Products from "./components/Products";
import CreateOrder from "./components/Getorder"; // Импорт нового компонента

const decodeToken = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        console.error("Error decoding token", e);
        return null;
    }
};

const AdminContainer = styled.div`
    display: flex;
    height: 100vh;
    background-color: #f7f9fc;
    color: #333;
    font-family: 'Arial', sans-serif;
`;

const Sidebar = styled.div`
    width: 250px;
    background-color: #103c5a;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
    flex: 1;
    padding: 30px;
    overflow-y: auto;
`;

const NavItem = styled.div`
    padding: 12px 15px;
    cursor: pointer;
    color: #ecf0f1;
    margin-bottom: 10px;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
        background-color: #34495e;
    }

    ${({ $active }) => $active && `
        background-color: #3498db;
        color: #fff;
        font-weight: bold;
    `}
`;

const Header = styled.header`
    background-color: #1B6392;
    color: white;
    padding: 20px 30px;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const ContentCard = styled.div`
    background-color: white;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const LogoContainer = styled.div`
    font-size: 24px;
    color: #3498db;
    margin-bottom: 30px;
    padding: 20px 0;
    border-bottom: 1px solid #34495e;
    text-align: center;
`;

const LogoutButton = styled.button`
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 12px 15px;
    cursor: pointer;
    width: 100%;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-top: auto;
    font-size: 16px;

    &:hover {
        background-color: #c0392b;
    }
`;

const Admin = () => {
    const [activeTab, setActiveTab] = useState('categories');
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        const decodedToken = decodeToken(accessToken);
        if (!decodedToken || decodedToken.role !== 'ROLE_ADMIN') {
            Notify.failure('Доступ запрещен! Только админы могут зайти.', {
                position: 'right-top',
                timeout: 3000,
            });
            navigate('/');
        }
    }, [navigate]);

    const renderContent = () => {
        switch (activeTab) {
            case 'categories':
                return <Categories />;
            case 'employees':
                return <Employees />;
            case 'products':
                return <Products />;
            case 'createOrder':
                return <CreateOrder />;
            default:
                return <div>Выбирай</div>;
        }
    };

    const handleLogout = () => {
        navigate('/');
        window.location.reload();
    };

    return (
        <AdminContainer>
            <Sidebar>
                <LogoContainer>Панель Админа</LogoContainer>
                <NavItem
                    $active={activeTab === 'categories'}
                    onClick={() => setActiveTab('categories')}
                >
                    Каталог продуктов
                </NavItem>
                <NavItem
                    $active={activeTab === 'employees'}
                    onClick={() => setActiveTab('employees')}
                >
                    Сотрудники
                </NavItem>
                <NavItem
                    $active={activeTab === 'products'}
                    onClick={() => setActiveTab('products')}
                >
                    Продукты
                </NavItem>
                <NavItem
                    $active={activeTab === 'createOrder'}
                    onClick={() => setActiveTab('createOrder')}
                >
                    Список заказов
                </NavItem>
                <LogoutButton style={{ backgroundColor: "red" }} onClick={handleLogout}>
                    Выйти
                </LogoutButton>
            </Sidebar>
            <Content>
                <Header>
                    {activeTab === 'categories' ? 'Каталог продуктов' :
                        activeTab === 'employees' ? 'Сотрудники' :
                            activeTab === 'products' ? 'Продукты' :
                                activeTab === 'createOrder' ? 'Список заказов' : 'Выбирай'}
                </Header>
                <ContentCard>
                    {renderContent()}
                </ContentCard>
            </Content>
        </AdminContainer>
    );
};

export default Admin;
