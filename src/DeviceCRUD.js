import React, { useState, useEffect } from 'react';
import DeviceService from './DeviceService';
import './DeviceCRUD.css';

const DeviceCRUD = () => {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({ description: '', address: '', max_hourly_energy_consumption: 0, userId: 0 });
  const [updatedDevice, setUpdatedDevice] = useState({});
  const [editingDeviceId, setEditingDeviceId] = useState(null);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await DeviceService.getAll();
      setDevices(response.data);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const handleCreateDevice = async () => {
    try {
      const response = await DeviceService.insert(newDevice);
      setDevices([...devices, response.data]);
      setNewDevice({ description: '', address: '', max_hourly_energy_consumption: 0, userId: 0 });
    } catch (error) {
      console.error('Error creating device:', error);
    }
  };

  const handleEditDevice = (id) => {
    setEditingDeviceId(id);
  };

  const handleSaveDevice = async (id) => {
    try {
      const deviceToSave = devices.find((device) => device.id === id);
      await DeviceService.update(id, deviceToSave);
      setEditingDeviceId(null);
    } catch (error) {
      console.error('Error saving device:', error);
    }
  };

  const handleDeleteDevice = async (id) => {
    try {
      await DeviceService.delete(id);
      const updatedDevices = devices.filter((device) => device.id !== id);
      setDevices(updatedDevices);
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  return (
    <div className="device-crud-container">
      <h1>Device CRUD Page</h1>
      <div className="create-device">
        <h2>Create New Device</h2>
        <input
          type="text"
          placeholder="Description"
          value={newDevice.description}
          onChange={(e) => setNewDevice({ ...newDevice, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={newDevice.address}
          onChange={(e) => setNewDevice({ ...newDevice, address: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Hourly Energy Consumption"
          value={newDevice.max_hourly_energy_consumption}
          onChange={(e) =>
            setNewDevice({ ...newDevice, max_hourly_energy_consumption: parseFloat(e.target.value) })
          }
          
        />
        <input
          type="number"
          placeholder="userId"
          value={newDevice.userId}
          onChange={(e) => setNewDevice({ ...newDevice, userId: e.target.value })}
        />
        <button onClick={handleCreateDevice}>Create</button>
      </div>
      <div className="device-list">
        <h2>Device List</h2>
        <ul>
          {devices.map((device) => (
            <li key={device.id} className="device-item">
              {editingDeviceId === device.id ? (
                <div>
                  {/* Input fields for editing the device */}
                  <input
                    type="text"
                    value={device.description}
                    onChange={(e) => setDevices(devices.map((d) => (d.id === device.id ? { ...d, description: e.target.value } : d)))}
                  />
                  <input
                    type="text"
                    value={device.address}
                    onChange={(e) => setDevices(devices.map((d) => (d.id === device.id ? { ...d, address: e.target.value } : d)))}
                  />
                  <input
                    type="number"
                    value={device.max_hourly_energy_consumption}
                    onChange={(e) => setDevices(devices.map((d) => (d.id === device.id ? { ...d, max_hourly_energy_consumption: parseFloat(e.target.value) } : d)))}
                  />
                  <input
                    type="number"
                    value={device.userId}
                    onChange={(e) => setDevices(devices.map((d) => (d.id === device.id ? { ...d, userId: e.target.value } : d)))}
                  />
                  <button onClick={() => handleSaveDevice(device.id)}>Save</button>
                  <button onClick={() => setEditingDeviceId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  {/* Display the device details */}
                  <span className="device-info">Description: {device.description}</span>
                  <span className="device-info">Address: {device.address}</span>
                  <span className="device-info">Max/H Energy Consumption: {device.max_hourly_energy_consumption}</span>
                  <span className="device-info">User ID: {device.userId}</span>

                  <button onClick={() => handleEditDevice(device.id)}>Edit</button>
                  <button onClick={() => handleDeleteDevice(device.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeviceCRUD;