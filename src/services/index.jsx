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

  return data;
};

export const getChapters = async (id,page) => {
  const { data } = await api.get('/chapters/', {
    params: {
      id,
      page
    }
  });

  return data;
};

export const getPages = async (id,key = undefined) => {
  const { data } = await api.get('/pages/', {
    params: {
      id,
      key
    }
  });

  return data;
};