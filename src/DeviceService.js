import axios from 'axios';

const BASE_URL = 'http://localhost:8082/devices';

class DeviceService {
  getAll() {
    return axios.get(BASE_URL);
  }

  getById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }

  insert(device) {
    return axios.post(BASE_URL, device);
  }

  update(id, device) {
    return axios.put(`${BASE_URL}/update/${id}`, device);
  }

  delete(id) {
    return axios.delete(`${BASE_URL}/delete/${id}`);
  }
}

export default new DeviceService();
