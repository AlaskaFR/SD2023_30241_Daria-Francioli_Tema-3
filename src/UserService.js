import axios from 'axios';

const BASE_URL = 'http://localhost:8081/users';

class UserService {
  login(email, password) {
    return axios.get(`${BASE_URL}/login`, { params: { email, password } });
  }

  getAll() {
    return axios.get(BASE_URL);
  }

  getById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }

  insert(user) {
    return axios.post(BASE_URL, user);
  }

  update(id, user) {
    return axios.put(`${BASE_URL}/update/${id}`, user);
  }

  delete(id) {
    return axios.delete(`${BASE_URL}/delete/${id}`);
  }
}

export default new UserService();
