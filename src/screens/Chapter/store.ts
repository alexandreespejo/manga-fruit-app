import { create } from 'zustand'

type AggregationChapterType = {
  chapter: string
  count: number
  id: string
  others: any[]
}

type AggregationType = {
  mangaId: string,
  chapters?: {
    [x: string]: AggregationChapterType
  }
}

export type AggregationStoreType = {
  aggregation: AggregationType
  setAggregation: (state: AggregationType) => void
}

export const useCurrentManga = create<AggregationStoreType>((set, get) => ({
  aggregation: {
    mangaId: '',
    chapters: null
  },
  setAggregation: (state) => set(() => ({ aggregation: state })),
}))