import { getTags } from "../services/mangadex"
import { create } from "zustand"

type TagStoreType = {
  tags: any[]
  setTags: (state: any[]) => void
}

const useTagStore = create<TagStoreType>((set, get) => ({
  tags: [],
  setTags: (state: any[]) => set(() => ({ tags: state })),
}))

export function useTags() {
  const { tags, setTags } = useTagStore()

  const loadTags = async () => {
    try {
      const data = await getTags()
      if (data.data)
        setTags(data.data)
    } catch (e) {
      console.log(e)
    }
  }

  return {
    loadTags,
    tags
  }
}
