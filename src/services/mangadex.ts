import axios from 'axios'

const mangadexApi = axios.create({
  baseURL: 'https://api.mangadex.org/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getSearch = async (title: string) => {
  const { data } = await mangadexApi.get('manga/', {
    params: {
      title: title,
      availableTranslatedLanguage: ['pt-br'],
    }
  })

  return data
}

export const getCover = async (cover_id: string) => {
  const { data } = await mangadexApi.get(`cover/${cover_id}`)

  return data
}

export const getChapters = async (id: string, page?: string) => {

  const { data } = await mangadexApi.get(`manga/${id}/aggregate`, {
    params: {
      translatedLanguage: ['pt-br'],
    }
  })

  return data
}

export const getPages = async (id: string) => {
  const { data } = await mangadexApi.get(`/at-home/server/${id}`)
  return data
}