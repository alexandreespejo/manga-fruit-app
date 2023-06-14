import axios from 'axios'

const mangadexApi = axios.create({
  baseURL: 'https://api.mangadex.org/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export type LanguageTypes = 'pt-br' | 'en'

export const getSearch = async (title: string, limit: number, offset?: number) => {
  const { data } = await mangadexApi.get('manga/', {
    params: {
      title: title,
      limit,
      offset: offset ?? 0,
      availableTranslatedLanguage: ['pt-br'],
    }
  })

  return data
}

export const getCover = async (cover_id: string) => {
  const { data } = await mangadexApi.get(`cover/${cover_id}`)

  return data
}

export const getChapters = async (id: string, limit: number, offset?: number, lang?: LanguageTypes) => {

  const data = await mangadexApi.get(`chapter/`, {
    params: {
      manga: id,
      limit,
      offset: offset ?? 0,
      translatedLanguage: [lang ?? 'pt-br'],
    }
  })

  return data
}

export const getPages = async (id: string) => {
  const { data } = await mangadexApi.get(`/at-home/server/${id}`)
  return data
}