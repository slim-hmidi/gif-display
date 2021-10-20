import { useEffect, useState } from 'react'
import { fetchGifs, searchGifs } from '../api/index'
import { TrendingGifParams, FormattedGifData } from '../types/gif'

export const useFetchGifs = (params: TrendingGifParams) => {
  const [state, setState] = useState({
    status: 'idle',
    data: [] as FormattedGifData[],
    error: ''
  })
  const [paginationData, setPaginationData] = useState({
    page: 0,
    totalPages: 0,
    totalCount: 0
  })
  const fn = params.q ? searchGifs : fetchGifs
  useEffect(() => {
    setState({ ...state, status: 'pending' })
    async function loadGifs () {
      try {
        const { data, totalCount } = await fn(params)
        setState({ ...state, status: 'resolved', data })
        setPaginationData({ ...paginationData, totalPages: Math.floor(totalCount / 25), totalCount })
      } catch (error) {
        setState({ ...state, status: 'rejected', error: error as string })
      }
    }
    loadGifs()
  }, [params])

  return { state, paginationData }
}
