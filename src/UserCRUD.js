import React, { useState, useEffect } from 'react';
import UserService from './UserService'; // Import your user service module.
import './UserCRUD.css'; // Import your CSS file for styling.

const UserCRUD = () => {
  // State variables for users and form fields
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from your service
  const fetchUsers = async () => {
    try {
      const response = await UserService.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Function to create a new user
  const handleCreateUser = async () => {
    try {
      const response = await UserService.insert(newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Function to edit a user
  const handleEditUser = (id) => {
    setEditingUserId(id);
  };

  // Function to save changes to a user
  const handleSaveUser = async (id) => {
    try {
      const userToSave = users.find((user) => user.id === id);
      await UserService.update(id, userToSave);
      setEditingUserId(null);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  // Function to delete a user
  const handleDeleteUser = async (id) => {
    try {
      await UserService.delete(id);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-crud-container">
      <h1>User CRUD Page</h1>
      <div className="create-user">
        <h2>Create New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <input
          type="boolean"
          placeholder="role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        />
        <button onClick={handleCreateUser}>Create</button>
      </div>
      <div className="user-list">
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="user-item">
              {editingUserId === user.id ? (
                <div>
                  {/* Input fields for editing the user */}
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUsers(users.map((u) => (u.id === user.id ? { ...u, name: e.target.value } : u)))}
                  />
                  <input
                    type="text"
                    value={user.email}
                    onChange={(e) => setUsers(users.map((u) => (u.id === user.id ? { ...u, email: e.target.value } : u)))}
                  />
                  <input
                    type="password"
                    value={user.password}
                    onChange={(e) => setUsers(users.map((u) => (u.id === user.id ? { ...u, password: e.target.value } : u)))}
                  />
                  <button onClick={() => handleSaveUser(user.id)}>Save</button>
                  <button onClick={() => setEditingUserId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  {/* Display the user details */}
                  <span className="user-info">Name: {user.name}</span>
                  <span className="user-info">Email: {user.email}</span>
                  <span className="user-info">Password: {user.password}</span>
                  <span className="user-info">Role: {user.role}</span>
                  <button onClick={() => handleEditUser(user.id)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserCRUD;
