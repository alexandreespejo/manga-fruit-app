import AsyncStorage from '@react-native-async-storage/async-storage'
type StoreFavoriteDataType = (mangaId: string) => Promise<void>
type GetFavoriteDataType = () => Promise<string[]>
type StoreChapterReadType = (mangaId: string, chapterId: string) => Promise<void>
type GetChapterReadType = () => Promise<object>

export const storeFavoriteMangaList: StoreFavoriteDataType = async (mangaId) => {
  try {
    const currentList = await getFavoriteMangaList()
    currentList.push(mangaId)
    await AsyncStorage.setItem('@manga_app_favorites', JSON.stringify(currentList))
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