import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WarningPicture from '../../../assets/warning.png';

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

const innerFirstBoxStyle = {
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'center',
};

const innerSecondBoxStyle = {
  display: 'flex',
  padding: '3px',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '150px',
};

interface PropsModal {
  changeColor: () => void;
  closeModal: () => void;
  stateModal: boolean;
}

const WarningModal: React.FC<PropsModal> = ({ closeModal, stateModal, changeColor }) => {
  return (
    <>
      <Modal open={stateModal} onClose={closeModal}>
        <Box sx={mainBoxStyle}>
          <Box sx={innerFirstBoxStyle}>
            <Box
              component='img'
              src={WarningPicture}
              alt='Warning Picture'
              sx={{ width: 30, height: 30 }}
            />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Вы хотите отменить заказ?
            </Typography>
          </Box>
          <Box sx={innerSecondBoxStyle}>
            <Button
              onClick={changeColor}
              variant="contained"
              color="success">Да</Button>
            <Button
              variant="contained"
              onClick={closeModal}
              color="error">Нет</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default WarningModal;