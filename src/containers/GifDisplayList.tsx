import React, { useState, ReactElement, ChangeEvent, useCallback } from 'react'
import TextField from '@mui/material/TextField'
import debounce from 'lodash.debounce'
import GifList from './GifList'

const style = {
  searchField: {
    marginTop: '2%',
    marginLeft: '40%',
    marginBottom: '5%'
  }
}

export default function GifDisplayList (): ReactElement {
  const [searchField, setSearchField] = useState('')

  const handleSearchChange = (event: ChangeEvent<any>) => {
    const { value } = event.target
    setSearchField(value)
  }

  const debouncedSearchChangeHandler = useCallback(debounce(handleSearchChange, 300)
    , [])
  return (
      <div>
                  <TextField
                    label="Search Gif"
                    data-testid="search-gif"
                    variant="outlined"
                    style={style.searchField}
                    onChange={debouncedSearchChangeHandler}
                    inputProps={{
                      'aria-label': 'search-gif-input'
                    }}
                    />
                  <GifList searchValue={searchField}/>

        </div>
  )
}
