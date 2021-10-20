import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

interface Props {
    title: string;
    url: string;
    gifPreviewHandler: (id: string) => void

}
export default function ListItem (props: Props) {
  const { title, url, gifPreviewHandler } = props

  const onClickHandler = (event: any) => {
    const { value } = event.target
    gifPreviewHandler(value)
  }
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardMedia
        component='img'
        height="140"
        image={url}
        alt={title}
      />
      <CardActions>
      <IconButton onClick={onClickHandler}>
          <OpenInNewIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
