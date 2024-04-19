import {Box, CardMedia, Container, Typography} from '@mui/material';
import img from '..//..//../assets/car.png';
import tt from '..//..//../assets/tt.svg';
import inst from '..//..//../assets/instagram.svg';
import wtsp from '..//..//../assets/whatsapp.svg';

const Footer = () => {
  return (
    <Container sx={{display: 'flex', flexDirection: 'raw',alignItems:'center', height: '300px', pt: 3, pb: 4}}>

      <Box
        sx={{p: 2, width: '100%'}}
      >
        <CardMedia
          sx={{width:200}}
          component="img"
          alt="Изображение"
          image={img}
        />
      </Box>

      <Box
        sx={{p: 5, width: '100%'}}
      >
        <Typography sx={{color:'white'}}>
          Наш Адрес: 7mkr 50a/1, Bishkek, Kyrgyzstan 720070
        </Typography>

      </Box>

      <Box
        sx={{display:'flex',gap:5, p: 5, width: '100%'}}
      >
        <Box>
          <CardMedia
            sx={{width: 50, height: 50}}
            component="img"
            alt="Изображение"
            image={tt}
          />
        </Box>

        <Box>
          <CardMedia
            sx={{width: 50, height: 50}}
            component="img"
            alt="Изображение"
            image={inst}
          />
        </Box>

        <Box>
          <CardMedia
            sx={{width: 50, height: 50}}
            component="img"
            alt="Изображение"
            image={wtsp}
          />
        </Box>
      </Box>

    </Container>
  );
};

export default Footer;
