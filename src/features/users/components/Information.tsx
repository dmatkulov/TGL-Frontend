import Warehouses from '../../warehouses/Warehouses';
import { Alert, Box, Grid, useMediaQuery } from '@mui/material';
import Banned from '../../banned/Banned';

const Information = () => {
  const isMediumScreen = useMediaQuery('(max-width:1056px)');
  return (
    <Grid
      container
      spacing={2}
      sx={{
        flexDirection: isMediumScreen ? 'column' : 'row',
        alignItems: isMediumScreen ? 'center' : 'flex-start',
      }}
    >
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            width: '100%',
            padding: '5px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 2,
          }}
        >
          <Box>
            <iframe
              width="250px"
              height="600px"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={'https://www.youtube.com/embed/__XzIIELWZw'}
            ></iframe>
          </Box>
          <Box>
            <Alert severity="info">Краткое обучающее видео.</Alert>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Alert severity="info">
            Ниже представлен Ваш адрес. <br /> Скопируйте его и вставьте в графу
            адреса на маркетплейсах.
          </Alert>
        </Box>
        <Warehouses />
      </Grid>
      <Grid item xs={12}>
        <Banned />
      </Grid>
    </Grid>
  );
};

export default Information;
