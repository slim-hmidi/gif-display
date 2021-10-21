import React, { ReactElement } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { FormattedGifData } from '../types/gif'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

interface Props {
    open: boolean;
    selectedGif: FormattedGifData;
    handleClose: () => void
}

export default function ModalWrapper (props: Props): ReactElement {
  const { open, handleClose, selectedGif } = props

  const updatedStyle = Object.assign(style, selectedGif?.originalImage?.width)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        data-testid='modal-gif'
      >
        <Box sx={updatedStyle}>
          <img
            data-testid={`img-${selectedGif?.id}`}
            src={selectedGif?.originalImage?.url}
            alt={selectedGif?.title} />
        </Box>
      </Modal>
    </div>
  )
}
