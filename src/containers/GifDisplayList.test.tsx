import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GifDisplayList from './GifDisplayList'

describe('GgifListDisplay: ', () => {
  test('Should change the search field when typing a word', async () => {
    render(<GifDisplayList />)

    const { getByTestId, getByLabelText } = screen

    expect(getByTestId('search-gif')).toBeInTheDocument()

    userEvent.type(getByLabelText('search-gif-input'), 'test')
    expect(getByLabelText('search-gif-input')).toHaveValue('test')
  })
})
