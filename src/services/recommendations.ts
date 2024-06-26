import axios from "axios"
import recommendations from './recommendations.json'

export const createRecommendations = async (mangaList: any[]) => {
  const body = { topten: mangaList }
  const data = await axios.post('https://getpantry.cloud/apiv1/pantry/1b33986d-c6a6-4b69-97e7-2ccf27ac9c00/basket/recommendations', body)
}

export const getRecommendations = async (key?: 'topten') => {
  const { data } = recommendations

  return data[key] ?? data
}