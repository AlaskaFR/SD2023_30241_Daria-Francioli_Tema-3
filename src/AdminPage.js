import React, { useEffect, useState } from 'react';
import UserService from './UserService';
import DeviceService from './DeviceService';
import { Link } from 'react-router-dom'; // Import Link component
import ChatRoom from './ChatRoom';
import './App.css';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const adminId = 2; // Replace with the actual admin ID

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchDevices = async () => {
      const response = await DeviceService.getAll();
      setDevices(response.data);
    };

    fetchUsers();
    fetchDevices();
  }, []);
  const handleUserSelection = (user) => {
    setSelectedUser(user);
};

  // Add CRUD operations for users and devices here

  return (
    <div>
      <h2>Admin Page</h2>
      <div>
        <ul>
        <h3>Send Messages to:</h3>
        {users.map(user => (
                        <li
                            key={user.id}
                            onClick={() => handleUserSelection(user)}
                            style={{ cursor: 'pointer' }}
                        >
                            {user.name}
            </li>
          ))}
        </ul>
        <Link to="/admin/users">Manage Users</Link>
      </div>
      <div>
        <Link to="/admin/devices">Manage Devices</Link>
      </div>
      {selectedUser && (
      <ChatRoom user={{ id: adminId, role: 1 }} selectedUserId={selectedUser.id} userId={adminId} />
    )}

    </div>
  );
};

export default AdminPage;
