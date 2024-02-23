import axios from 'axios'

const mangadexApi = axios.create({
  baseURL: 'https://api.mangadex.org/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export type LanguageTypes = 'pt-br' | 'en'
export type OrderTypes = "asc" | "desc"

export const getSearch = async (title: string, limit: number, offset?: number, tags?: any[]) => {
  const { data } = await mangadexApi.get('manga/', {
    params: {
      title: title,
      limit,
      offset: offset ?? 0,
      availableTranslatedLanguage: ['pt-br'],
      includedTags: tags,
      includes: ['cover_art']
    }
  })

  return data
}

export const getTags = async () => {
  const { data } = await mangadexApi.get('manga/tag')
  return data
}

export const getCover = async (cover_id: string) => {
  const { data } = await mangadexApi.get(`cover/${cover_id}`)

  return data
}

export const getChapters = async (
  id: string,
  limit: number,
  offset?: number,
  lang?: LanguageTypes,
  order?: OrderTypes
) => {
  const data = await mangadexApi.get(`manga/${id}/feed`, {
    params: {
      limit,
      offset: offset ?? 0,
      translatedLanguage: [lang ?? 'pt-br'],
      "order[chapter]": (order ?? "asc")
    }
  })

  return data
}

export const getMangaAggregation = async (
  id: string,
  lang?: LanguageTypes,
) => {
  const data = await mangadexApi.get(`manga/${id}/aggregate`, {
    params: {
      translatedLanguage: [lang ?? 'pt-br'],
    }
  })

  return data
}

export const getLastUpdates = async (
  lang?: LanguageTypes,
) => {
  const data = await mangadexApi.get(`manga`, {
    params: {
      limit: 10,
      availableTranslatedLanguage: [lang ?? 'pt-br'],
      includes: ['cover_art'],
      "order[updatedAt]": "desc",
      contentRating: ['safe']
    }
  })

  return data
}

export const getPages = async (id: string) => {
  const { data } = await mangadexApi.get(`/at-home/server/${id}`)
  return data
}