import { CardMedia, Container, Grid, Typography } from '@mui/material';
import img from '..//..//../assets/car.png';
import tt from '..//..//../assets/tt.svg';
import inst from '..//..//../assets/instagram.svg';
import wtsp from '..//..//../assets/whatsapp.svg';
import SocialMedia from './SocialMedia';

const Footer = () => {
  return (
    <Container>
      <Grid
        container
        sx={{
          pt: 3,
          pb: 4,
        }}
      >
        <Grid item xs={3}>
          <CardMedia
            sx={{ width: 200 }}
            component="img"
            alt="Изображение"
            image={img}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom variant="body1" color="white">
            <strong>Наш Адрес:</strong> 7-й микрорайон, 50а/1 стр
          </Typography>
          <Typography color="white">
            Октябрьский район, Бишкек, 720028
          </Typography>
        </Grid>

        <Grid item xs={3} gap={2} display="flex" flexDirection="column">
          <SocialMedia
            tiktok
            title="Мы в ТикТок"
            alt="ТикТок"
            href="#"
            imagePath={tt}
          />

          <SocialMedia
            instagram
            title="Мы в Инстаграм"
            alt="Инстаграм"
            href="#"
            imagePath={inst}
          />

          <SocialMedia
            whatsapp
            title="Написать в WhatsApp"
            alt="WhatsApp"
            href="#"
            imagePath={wtsp}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
