import axios from 'axios'

const BASE_URL = 'https://6a2efe11c9776ca6c0c53234.mockapi.io'
const RESOURCE = `${BASE_URL}/user`

export default {
  getAllUsuarios() {
    return axios.get(RESOURCE)
  },
  getUsuarioById(id) {
    return axios.get(`${RESOURCE}/${id}`)
  },
  createUsuario(data) {
    return axios.post(RESOURCE, data)
  },
  updateUsuario(id, data) {
    return axios.put(`${RESOURCE}/${id}`, data)
  },
  deleteUsuario(id) {
    return axios.delete(`${RESOURCE}/${id}`)
  }
}