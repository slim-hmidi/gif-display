import React, { useState, ReactElement, ChangeEvent, useCallback, useEffect } from 'react'
import debounce from 'lodash.debounce'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import TextField from '@mui/material/TextField'
import ListItem from '../components/ListItem'
import ModalWrapper from '../components/Modal'
import { FormattedGifData } from '../types/gif'
import { useFetchGifs } from '../hooks'

const style = {
  searchField: {
    marginTop: '10%'
  },
  circularProgress: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%'
  },
  message: {
    position: 'absolute' as 'absolute',
    top: '25%',
    left: '40%'
  }

}

export default function GifList (): ReactElement {
  const [open, setOpen] = useState(false)
  const [selectedGif, setSelectedGif] = useState({} as FormattedGifData)
  const [gifParams, setGifParams] = useState({
    q: '',
    offset: 0,
    limit: 25,
    rating: 'g',
    bundle: 'messaging_non_clips'
  })
  const { state, paginationData } = useFetchGifs(gifParams)
  const { data, status } = state
  const [pagination, setPagination] = useState(paginationData)

  useEffect(() => {
    const { page, totalCount } = pagination
    if (paginationData.totalCount !== totalCount) {
      setPagination({ ...paginationData, page })
    }
  }, [paginationData.totalCount])

  // handlers
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const { totalPages, totalCount } = pagination
    setPagination({ ...pagination, page: value })
    if (value === totalPages) {
      const offset = totalPages * 25
      const remain = totalCount - offset
      const limit = offset + remain
      setGifParams({ ...gifParams, offset, limit })
    } else {
      setGifParams({ ...gifParams, offset: value * 25, limit: (value * 25) + 25 })
    }
  }

  const handleSearchChange = (event: ChangeEvent<any>) => {
    const { value } = event.target
    setGifParams({ ...gifParams, q: value })
  }

  const debouncedSearchChangeHandler = useCallback(debounce(handleSearchChange, 300)
    , [])

  const gifPreviewHandler = (id: string) => {
    const gif = data.find((elem) => elem.id === id)
    if (gif) {
      setSelectedGif(gif)
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (status === 'rejected') {
    return <h1>Oops an error occurs</h1>
  }

  if (status === 'pending') {
    return <CircularProgress style={style.circularProgress} />
  }

  return (
    <div>
            <ModalWrapper
              open={open}
              handleClose={handleClose}
              selectedGif={selectedGif}
            />
              <Grid container
                justifyContent="center"
                spacing={4}>
                <Grid item>
                  <TextField
                    id="search-field"
                    label="Search Gif"
                    variant="outlined"
                    style={style.searchField}
                    onChange={debouncedSearchChangeHandler}
                    />
                    </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    {data.length
                      ? data.map((elem) => (
                      <Grid key={elem.id} item xs={3}>
                                    <ListItem
                                      key={elem.id}
                                      title={elem.title}
                                      url={elem.fixedHeightImage.url}
                                      gifPreviewHandler={() => gifPreviewHandler(elem.id)} />
                        </Grid>
                      ))
                      : <h1 style={style.message}>No Gif(s) found</h1>
                    }
                  </Grid>
                  </Grid>
                  <Grid item>
                    {
                      pagination.totalPages
                        ? <Pagination count={pagination.totalPages} page={pagination.page} onChange={handlePageChange} />
                        : null

                    }

                  </Grid>
                  </Grid>
            </div>

  )
}
