import React, { useState, ReactElement, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
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
  },
  pagination: {
    position: 'absolute' as 'absolute',
    left: '40%'
  },
  item: {
    marginBottom: '1%'
  }

}
interface Props {
  searchValue: string
}
export default function GifList (props: Props): ReactElement {
  const { searchValue } = props
  const [open, setOpen] = useState(false)
  const [selectedGif, setSelectedGif] = useState({} as FormattedGifData)
  const [gifParams, setGifParams] = useState({
    q: searchValue,
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

  useEffect(() => {
    setGifParams({ ...gifParams, q: searchValue })
  }, [searchValue])

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
    return <h1 data-testid="gif-error-message">Oops an error occurs</h1>
  }

  if (status === 'pending') {
    return <CircularProgress style={style.circularProgress} />
  }

  return (
    <div data-testid='wrapper'>
            <ModalWrapper
              open={open}
              handleClose={handleClose}
              selectedGif={selectedGif}
            />
              <Grid container
                justifyContent="center"
                spacing={4}>
                <Grid item>
                  <Grid container justifyContent="space-around">
                    {data.length
                      ? data.map((elem) => (
                      <Grid key={elem.id} item style={style.item}>
                                    <ListItem
                                      key={elem.id}
                                      id={elem.id}
                                      title={elem.title}
                                      url={elem.fixedHeightImage.url}
                                      gifPreviewHandler={() => gifPreviewHandler(elem.id)} />
                        </Grid>
                      ))
                      : <h1
                        data-testid='no-gif-message'
                        style={style.message}
                        >No Gif(s) found</h1>
                    }
                  </Grid>
                  </Grid>
                  </Grid>
                  <div style={style.pagination}>
                    {
                      pagination.totalPages && data.length
                        ? <Pagination
                          data-testid='pagination'
                          count={pagination.totalPages}
                          page={pagination.page}
                          onChange={handlePageChange} />
                        : null

                    }
                  </div>
            </div>

  )
}
