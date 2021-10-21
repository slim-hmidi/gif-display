import { useEffect, useState, useRef } from 'react'
import { fetchGifs, searchGifs } from '../api/index'
import { TrendingGifParams, FormattedGifData } from '../types/gif'

const useIsMountedRef = () => {
  const isMountedRef = useRef(false)
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])
  return isMountedRef
}

export const useFetchGifs = (params: TrendingGifParams) => {
  const isMountedRef = useIsMountedRef()
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
    async function loadGifs () {
      try {
        setState({ ...state, status: 'pending' })
        const { data, totalCount } = await fn(params)
        if (isMountedRef.current) {
          setState({ ...state, status: 'resolved', data })
          const totalPages = totalCount > 25 ? Math.floor(totalCount / 25) : 1
          setPaginationData({ ...paginationData, totalPages: totalPages, totalCount })
        }
      } catch (error) {
        setState({ ...state, status: 'rejected', error: error as string })
      }
    }
    loadGifs()
  }, [params, isMountedRef])

  return { state, paginationData }
}
