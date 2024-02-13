import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatRoom from './ChatRoom';

const UserDevices = ({ userId }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // Fetch user devices when the component mounts
    const fetchUserDevices = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/devices/user/${userId}`);
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching user devices:', error);
      }
    };

    fetchUserDevices();
  }, [userId]);

  const userRole = 0; 

  return (
    <div>
      <h2>User Devices</h2>
      <ul>
        {devices.map((device) => (
          <li key={device.id} style={{ marginBottom: '20px' }}>
            <strong>Description:</strong> {device.description}<br />
            <strong>Address:</strong> {device.address}<br />
            <strong>Max Hourly Energy Consumption:</strong> {device.max_hourly_energy_consumption}<br />
            <strong> </strong>
          </li>
        ))}
      </ul>
      <ChatRoom user={{ id: 1, role: 0 }} selectedUserId={2} userId={1} />
    </div>
  );
};

export default UserDevices;

