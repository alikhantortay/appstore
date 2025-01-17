import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import '../../../global-styles.css';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        password: '',
        phone: '',
        firstname: '',
        lastname: '',
        isManager: false,
        isWorker: false
    });
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const fetchEmployees = async () => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            if (!accessToken) {
                Notify.failure('Токен доступа не найден.');
                return;
            }

            const response = await axios.get(`${apiBaseUrl}/admin/all-employees/get`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            Notify.failure('Не удалось получить список сотрудников.');
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleAddEmployee = async (e) => {
        e.preventDefault();

        if (!newEmployee.isManager && !newEmployee.isWorker) {
            Notify.failure('Пожалуйста, выберите роль сотрудника (Менеджер или Работник).');
            return;
        }

        try {
            const accessToken = sessionStorage.getItem('accessToken');
            if (!accessToken) {
                Notify.failure('Токен доступа не найден.');
                return;
            }

            const response = await axios.post(`${apiBaseUrl}/admin/create-employee`, {
                username: newEmployee.name,
                password: newEmployee.password,
                phoneNumber: newEmployee.phone,
                firstName: newEmployee.firstname,
                lastName: newEmployee.lastname,
                isManager: newEmployee.isManager,
                isWorker: newEmployee.isWorker,
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            setEmployees([...employees, response.data]);
            setNewEmployee({
                name: '',
                password: '',
                phone: '',
                firstname: '',
                lastname: '',
                isManager: false,
                isWorker: false,
            });
            Notify.success('Сотрудник успешно добавлен');
        } catch (error) {
            console.error('Error adding employee:', error);
            Notify.failure('Не удалось добавить сотрудника.');
        }
    };

    const handleDeleteEmployee = async (id) => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            if (!accessToken) {
                Notify.failure('Токен доступа не найден.');
                return;
            }

            await axios.delete(`${apiBaseUrl}/admin/delete-customer/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            setEmployees(employees.filter(employee => employee.id !== id));
            Notify.success('Сотрудник успешно удален');
        } catch (error) {
            console.error('Error deleting employee:', error);
            Notify.failure('Не удалось удалить сотрудника.');
        }
    };

    const handleEditClick = (employee) => {
        setEditingEmployee({
            id: employee.id,
            name: employee.name,
            password: '',
            phone: employee.phoneNumber,
            firstname: employee.firstname,
            lastname: employee.lastname,
            isManager: employee.role === 'MANAGER',
            isWorker: employee.role === 'WORKER',
        });
        setShowEditModal(true);
    };

    const handleUpdateEmployee = async (e) => {
        e.preventDefault();

        try {
            const accessToken = sessionStorage.getItem('accessToken');
            if (!accessToken) {
                Notify.failure('Токен доступа не найден.');
                return;
            }

            await axios.put(`${apiBaseUrl}/admin/employee/${editingEmployee.id}/update`, {
                username: editingEmployee.name,
                password: editingEmployee.password,
                phoneNumber: editingEmployee.phone,
                firstName: editingEmployee.firstname,
                lastName: editingEmployee.lastname,
                isManager: editingEmployee.isManager,
                isWorker: editingEmployee.isWorker,
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            Notify.success('Данные сотрудника успешно обновлены');
            setShowEditModal(false);
            setEditingEmployee(null);
            fetchEmployees();
        } catch (error) {
            console.error('Error updating employee:', error);
            Notify.failure('Не удалось обновить данные сотрудника.');
        }
    };

    return (
        <div className="container mt-4">
            <style>
                {`
                    .custom-checkbox {
                        width: 1.5em;
                        height: 1.5em;
                    }
                    .custom-checkbox:checked {
                        background-color: #0d6efd;
                        border-color: #0d6efd;
                    }
                    .form-check-label {
                        padding-left: 0.5em;
                        font-size: 1.1em;
                    }
                `}
            </style>
            <h1 className="mb-4">Управление сотрудниками</h1>

            <div className="card mb-4">
                <div className="card-body">
                    <h2 className="card-title">Добавить нового сотрудника</h2>
                    <form onSubmit={handleAddEmployee}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Имя пользователя</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Shahrukh"
                                value={newEmployee.name}
                                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Пароль</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Должен составить не мнее 6 символов"
                                value={newEmployee.password}
                                onChange={(e) => setNewEmployee({...newEmployee, password: e.target.value})}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Номер телефона</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                placeholder="+77051234567"
                                value={newEmployee.phone}
                                onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label">Имя</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstname"
                                value={newEmployee.firstname}
                                onChange={(e) => setNewEmployee({...newEmployee, firstname: e.target.value})}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label">Фамилия</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastname"
                                value={newEmployee.lastname}
                                onChange={(e) => setNewEmployee({...newEmployee, lastname: e.target.value})}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input custom-checkbox"
                                    id="isManager"
                                    checked={newEmployee.isManager}
                                    onChange={(e) => setNewEmployee({
                                        ...newEmployee,
                                        isManager: e.target.checked,
                                        isWorker: e.target.checked ? false : newEmployee.isWorker
                                    })}
                                />
                                <label className="form-check-label" htmlFor="isManager">Менеджер</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input custom-checkbox"
                                    id="isWorker"
                                    checked={newEmployee.isWorker}
                                    onChange={(e) => setNewEmployee({
                                        ...newEmployee,
                                        isWorker: e.target.checked,
                                        isManager: e.target.checked ? false : newEmployee.isManager
                                    })}
                                />
                                <label className="form-check-label" htmlFor="isWorker">Работник</label>
                            </div>
                        </div>
                        <button type="submit" className="btn" style={{backgroundColor:"#0056B3"}}>Добавить сотрудника</button>
                    </form>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Список сотрудников</h2>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Имя пользователя</th>
                                <th>Имя</th>
                                <th>Фамилия</th>
                                <th>Телефон</th>
                                <th>Роль</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.firstname}</td>
                                    <td>{employee.lastname}</td>
                                    <td>{employee.phoneNumber}</td>
                                    <td>
                                         <span
                                             style={{
                                                 backgroundColor:
                                                     employee.role === 'ADMIN'
                                                         ? '#f87171'
                                                         : employee.role === 'MANAGER'
                                                             ? '#60a5fa'
                                                             : employee.role === 'WORKER'
                                                                 ? '#34d399'
                                                                 : '#9ca3af',
                                                 color: 'white',
                                                 padding: '4px 8px',
                                                 borderRadius: '9999px',
                                                 fontSize: '12px',
                                                 fontWeight: 'bold',
                                             }}
                                         >
                                            {employee.role}
                                         </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => handleEditClick(employee)}
                                            style={{
                                                backgroundColor:"#0056B3", border:"#0056B3", marginRight:"10px"}}
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDeleteEmployee(employee.id)}
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

            {showEditModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Редактировать сотрудника</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleUpdateEmployee}>
                                    <div className="mb-3">
                                        <label htmlFor="editUsername" className="form-label">Имя пользователя</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editUsername"
                                            value={editingEmployee.name}
                                            onChange={(e) => setEditingEmployee({...editingEmployee, name: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editPassword" className="form-label">Новый пароль</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="editPassword"
                                            value={editingEmployee.password}
                                            onChange={(e) => setEditingEmployee({...editingEmployee, password: e.target.value})}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editPhone" className="form-label">Номер телефона</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="editPhone"
                                            value={editingEmployee.phone}
                                            onChange={(e) => setEditingEmployee({...editingEmployee, phone: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editFirstname" className="form-label">Имя</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editFirstname"
                                            value={editingEmployee.firstname}
                                            onChange={(e) => setEditingEmployee({...editingEmployee, firstname: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editLastname" className="form-label">Фамилия</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editLastname"
                                            value={editingEmployee.lastname}
                                            onChange={(e) => setEditingEmployee({...editingEmployee, lastname: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input custom-checkbox"
                                                id="editIsManager"
                                                checked={editingEmployee.isManager}
                                                onChange={(e) => setEditingEmployee({
                                                    ...editingEmployee,
                                                    isManager: e.target.checked,
                                                    isWorker: e.target.checked
                                                })}
                                            />
                                            <label className="form-check-label" htmlFor="editIsManager">Менеджер</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input custom-checkbox"
                                                id="editIsWorker"
                                                checked={editingEmployee.isWorker}
                                                onChange={(e) => setEditingEmployee({
                                                    ...editingEmployee,
                                                    isWorker: e.target.checked,
                                                    isManager: e.target.checked ? false : editingEmployee.isManager
                                                })}
                                            />
                                            <label className="form-check-label" htmlFor="editIsWorker">Работник</label>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Сохранить изменения</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;

