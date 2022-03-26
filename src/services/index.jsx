import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const mangadexApi = axios.create({
  baseURL: 'https://api.mangadex.org/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSearch = async (title) => {
  const { data } = await mangadexApi.get('manga/', {
    params: {
      title: title,
      availableTranslatedLanguage:['pt-br']
    }
  });

  return data;
};

export const getCover = async (cover_id) => {
  const { data } = await mangadexApi.get(`cover/${cover_id}`);

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