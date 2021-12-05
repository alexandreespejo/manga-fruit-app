import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSearch = async (title) => {
  const { data } = await api.get('/search/', {
    params: {
      title: title
    }
  });
  return data
};