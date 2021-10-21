import React, { ReactElement } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

const style = {
  width: '140px',
  height: '140px'
}

interface Props {
    id: string;
    title: string;
    url: string;
    gifPreviewHandler: (id: string) => void

}
export default function ListItem (props: Props): ReactElement {
  const { id, title, url, gifPreviewHandler } = props

  const onClickHandler = (event: any) => {
    const { value } = event.target
    gifPreviewHandler(value)
  }
  return (
    <Card>
      <CardMedia
        component='img'
        style={style}
        image={url}
        alt={title}
        data-testid={`item-${id}`}
      />
      <CardActions>
      <IconButton data-testid={`preview-gif-${id}`} onClick={onClickHandler}>
          <OpenInNewIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
