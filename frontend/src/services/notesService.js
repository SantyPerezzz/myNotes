import api from './api'; // importamos la instancia configurada de Axios

const API_URL = '/notes'; // no hace falta la URL completa si ya está en api.js

export const getNotes = async (archived) => {
  const response = await api.get(`${API_URL}?archived=${archived}`);
  console.log(`${API_URL}/?archived=${archived}`);
  return response.data;
};

export const getNote = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

export const createNote = async (note) => {
  const response = await api.post(API_URL, note);
  return response.data;
};

export const updateNote = async (id, note) => {
  const response = await api.put(`${API_URL}/${id}`, note);
  return response.data;
};

export const deleteNote = async (id) => {
  await api.delete(`${API_URL}/${id}`);
};
