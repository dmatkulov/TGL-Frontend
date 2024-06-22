import Warehouses from '../../warehouses/Warehouses';
import { Alert, Box, Grid } from '@mui/material';
import Banned from '../../banned/Banned';
import videoTutorial from '../../../assets/tutorial.webm';

const Information = () => {
  return (
    <Grid container direction="column">

        <Grid xs={4} item sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
          <Box sx={{
            width: '230px',
            padding: '5px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Box>
              <iframe
                width="220"
                height="450"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={videoTutorial}>
              </iframe>
            </Box>
            <Box>
              <Alert severity="info">
                Краткое обучающее видео о том как вводить ваш адрес на маркетплейсе
              </Alert>
            </Box>
          </Box>
          <Grid item xs={8}  sx={{
            width: '100%',
            padding: '5px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
            <Box>
              <Alert severity="info">
                Ниже представлен Ваш адрес. Скопируйте его и вставьте в графу адреса на маркетплейсах.
              </Alert>
            </Box>
            <Warehouses />
          </Grid>
        </Grid>

      <Grid item xs={12} m={2}>
        <Banned />
      </Grid>
    </Grid>
  );
};

export default Information;
