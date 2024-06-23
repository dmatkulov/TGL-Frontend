import {
  Box,
  Button,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import WarningPicture from '../../../assets/warning.png';
import React from 'react';

const mainBoxStyle = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'center',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  backgroundColor: 'background.paper',
  borderRadius: 3,
  p: 4,
};

const innerSecondBoxStyle = {
  display: 'flex',
  padding: '3px',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '150px',
};

interface PropsModal {
  closeModal: () => void;
  deleteHandler: () => void;
  stateModal: boolean;
}

const WarningPupModal: React.FC<PropsModal> = ({
  closeModal,
  deleteHandler,
  stateModal,
}) => {
  const isLarge = useMediaQuery('(min-width:770px)');
  return (
    <>
      <Modal open={stateModal} onClose={closeModal}>
        <Box sx={mainBoxStyle} style={{ width: isLarge ? 'auto' : '60%' }}>
          <Stack style={{ textAlign: 'center' }} alignItems="center">
            <img
              src={WarningPicture}
              alt="Warning Picture"
              style={{ width: 30, height: 30 }}
            />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Вы точно хотите удалить заказ?
            </Typography>
          </Stack>
          <Box sx={innerSecondBoxStyle}>
            <Button onClick={deleteHandler} variant="contained" color="success">
              Да
            </Button>
            <Button variant="contained" onClick={closeModal} color="error">
              Нет
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default WarningPupModal;
