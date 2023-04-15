import axios from 'axios'

const mangadexApi = axios.create({
  baseURL: 'https://api.mangadex.org/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getSearch = async (title) => {
  const { data } = await mangadexApi.get('manga/', {
    params: {
      title: title,
      availableTranslatedLanguage:['pt-br'],
    }
  })

  return data
}

export const getCover = async (cover_id) => {
  const { data } = await mangadexApi.get(`cover/${cover_id}`)

  return data
}

export const getChapters = async (id,page) => {
  
  const  {data}  = await mangadexApi.get(`manga/${id}/aggregate`,{
    params: {
      translatedLanguage:['pt-br'],
    }
  })
  
  return data
}

export const getPages = async (id) => {
  const { data } = await mangadexApi.get(`/at-home/server/${id}`)
  return data
}