import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { WebSocketProvider } from './WebSocketComponent'; // Import the WebSocketProvider
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import UserPage from './UserPage';
import DeviceCRUD from './DeviceCRUD';
import UserCRUD from './UserCRUD';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <WebSocketProvider> {/* Wrap the Router with WebSocketProvider */}
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/admin" element={user && user.role === 1 ? <AdminPage user={user} /> : <Navigate to="/login" />} />
          <Route path="/user" element={user && user.role === 0 ? <UserPage user={user} /> : <Navigate to="/login" />} />
          <Route path="/admin/devices" element={<DeviceCRUD />} />
          <Route path="/admin/users" element={<UserCRUD />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </WebSocketProvider>
  );
};

export default App;
