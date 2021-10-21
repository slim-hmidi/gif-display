import { rest } from 'msw'
import trendingMockData from './trendingGifs.json'
import searchMockData from './searchGifs.json'

// const apiKey = process.env.REACT_APP_API_KEY
export const handlers = [
  rest.get('/trending', (req, res, ctx) => {
    const { data, pagination, meta } = trendingMockData
    return res(
      ctx.status(200),
      ctx.json({
        data,
        pagination,
        meta
      })
    )
  }),

  rest.get('/search', (req, res, ctx) => {
    const { data, pagination, meta } = searchMockData
    return res(
      ctx.status(200),
      ctx.json({
        data,
        pagination,
        meta
      })
    )
  })

]
