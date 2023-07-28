import AsyncStorage from '@react-native-async-storage/async-storage'
type StoreFavoriteDataType = (mangaList: any[]) => Promise<void>
type GetFavoriteDataType = () => Promise<any[]>

type StoreChapterReadType = (mangaId: string, chapterId: string) => Promise<void>
type GetChapterReadType = () => Promise<object>

export const storeFavoriteMangaList: StoreFavoriteDataType = async (mangaList) => {
  try {
    await AsyncStorage.setItem('@manga_app_favorites', JSON.stringify(mangaList))
  } catch (e) {
    // saving error
  }
}

export const getFavoriteMangaList: GetFavoriteDataType = async () => {
  try {
    const value = await AsyncStorage.getItem('@manga_app_favorites')
    const responseList = value ? JSON.parse(value) : []
    return responseList
  } catch (e) {
    return []
  }
}

export const storeChapterRead: StoreChapterReadType = async (mangaId, chapterId) => {
  try {
    let currentChapters = await getChapterRead()
    if (currentChapters[mangaId]) currentChapters[mangaId].push(chapterId)
    else currentChapters[mangaId] = [chapterId]

    await AsyncStorage.setItem('@manga_app_chapters', JSON.stringify(currentChapters))
  } catch (e) {
    // saving error
  }
}

export const getChapterRead: GetChapterReadType = async () => {
  try {
    const value = await AsyncStorage.getItem('@manga_app_chapters')
    const responseList = value ? JSON.parse(value) : {}
    return responseList
  } catch (e) {
    return {}
  }
}

export const getIsDarkMode = async () => {
  const state = await AsyncStorage.getItem('@manga_fruit_application_is_dark_mode') ?? 'false'
  return state === 'true'
}

export const getShowLastReaders = async () => {
  const state = await AsyncStorage.getItem('@manga_fruit_application_show_last_readers') ?? 'false'
  return state === 'true'
}

export const getShowSuggestions = async () => {
  const state = await AsyncStorage.getItem('@manga_fruit_application_show_suggestions') ?? 'false'
  return state === 'true'
}

export const setAppShowSuggestions = async (state: boolean) => {
  await AsyncStorage.setItem('@manga_fruit_application_show_suggestions', String(state))
}

export const setAppShowLastReaders = async (state: boolean) => {
  await AsyncStorage.setItem('@manga_fruit_application_show_last_readers', String(state))
}

export const setAppIsDarkMode = async (state: boolean) => {
  await AsyncStorage.setItem('@manga_fruit_application_is_dark_mode', String(state))
}