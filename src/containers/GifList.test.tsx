import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import GifList from './GifList'
import trendingDataMock from '../test/trendingGifs.json'
import searchDataMock from '../test/searchGifs.json'
import { server, rest } from '../test/server'

describe('GifList.tsx', () => {
  test('Should render initially the page', async () => {
    render(<GifList searchValue='' />)

    await waitFor(() => screen.getAllByTestId(/item-/))

    expect(screen.getAllByTestId(/item-/)).toHaveLength(trendingDataMock.data.length)
    expect(screen.getAllByTestId(/preview-gif-/)).toHaveLength(trendingDataMock.data.length)
    expect(screen.getByTestId('pagination')).toBeInTheDocument()
    expect(screen.getByTestId('pagination')).toHaveTextContent('1')
  })

  test('Should render the modal when click the preview button', async () => {
    const { data } = trendingDataMock
    const id = data[0].id

    render(<GifList searchValue='' />)

    const { getAllByTestId, getByTestId } = screen

    await waitFor(() => getAllByTestId(/item-/))

    fireEvent.click(getByTestId(`preview-gif-${id}`))
    expect(getByTestId('modal-gif')).toBeInTheDocument()
    expect(getByTestId(`img-${id}`)).toBeInTheDocument()
  })

  test('Should display the list of gifs when type a word', async () => {
    render(<GifList searchValue='happy' />)

    await waitFor(() => screen.getAllByTestId(/item-/))
    expect(screen.getAllByTestId(/item-/)).toHaveLength(searchDataMock.data.length)
  })

  test('Should return no Gif found if the word does not match any gif', async () => {
    server.use(
      rest.get('/search', async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
          data: [],
          pagination: {
            total_count: 0,
            offset: 0,
            limit: 0
          },
          meta: {
            status: 200,
            msg: 'OK',
            response_id: 'jzwu3ty7w59jsapj2l6s4wfvtso7vd2hab6ko812'
          }
        }))
      })
    )

    render(<GifList searchValue='123' />)

    await waitFor(() => expect(screen.getByTestId('no-gif-message')).toBeInTheDocument())
  })

  test('Should return an error if api throw an error', async () => {
    server.use(
      rest.get('/search', async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
          data: [],
          pagination: {
            total_count: 0,
            offset: 0,
            limit: 0
          },
          meta: {
            status: 400,
            msg: 'KO',
            response_id: 'jzwu3ty7w59jsgpj2l6s4wfvtsf7vd2hab6ko812'
          }
        }))
      })
    )

    render(<GifList searchValue='123' />)

    await waitFor(() => expect(screen.getByTestId('gif-error-message')).toBeInTheDocument())
  })
})
