import * as React from 'react';
import { Box, Button, Typography, Modal, Image, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '.5rem',
  boxShadow: 24,
  p: 4,
};

const StyledModal = styled(Modal)`
  max-width: 400px;
`;

export default function CurrentGameDetails(props) {
  const [t, i18n] = useTranslation('global');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant={'contained'}
        size="small"
        color="warning"
      >
        Open to see game details
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} display={'flex'} flexDirection={'column'}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            '{props.playername}' {t('game-details.is-playing')} {props.champ}
          </Typography>
          <Typography variant="h6" component="h2">
            {t('game-details.game-mode')}: {props.gameMode}
          </Typography>

          {/* <Typography variant="h6" component="h2">
            Game started at: {props.gameStartTime}
          </Typography> */}

          <Typography variant="h6" component="h2">
            {t('game-details.game-duration')} {props.gameTime}{' '}
            {t('game-details.minutes')}
          </Typography>
          <img width={'600'} src={props.image} alt={'champ image'}></img>
        </Box>
      </Modal>
    </div>
  );
}
