import { camelCaseKeys, encodeQueryParams } from '../utils/index'
import { TrendingGifParams, SearchGifParams, GifResponse, FormattedGifData, ApiResponse } from '../types/gif'

const trendingEndpoint = 'trending'
const searchEndpoint = 'search'
const apiKey = 'tVaJe9QRTL6VZp9xhBkogbNWFTI9hYnJ'

const client = async (endpoint: string, queryParams: string): Promise<ApiResponse> => {
  const config = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
  }
  try {
    const response = await fetch(`${endpoint}?api_key=${apiKey}&${queryParams}`, config)
    const { data, meta, pagination } = await response.json()

    if (meta.status >= 400) {
      throw new Error('error while fetching the giphy trending api')
    }

    const formattedData: FormattedGifData[] = data.map(camelCaseKeys).map((item: GifResponse): FormattedGifData => ({
      id: item.id,
      title: item.title,
      fixedHeightImage: item.images.fixedHeight,
      originalImage: item.images.original
    }))

    return { data: formattedData, totalCount: pagination.total_count }
  } catch (error: any) {
    throw new Error(error?.message)
  }
}

export const fetchGifs = async (params: TrendingGifParams) => await client(trendingEndpoint, encodeQueryParams(params))
export const searchGifs = async (params: SearchGifParams) => await client(searchEndpoint, encodeQueryParams(params))
