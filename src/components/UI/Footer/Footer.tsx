import {
  Box,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import img from '..//..//../assets/car.png';
import tt from '..//..//../assets/tt.svg';
import inst from '..//..//../assets/instagram.svg';
import wtsp from '..//..//../assets/whatsapp.svg';
import SocialMedia from './SocialMedia';
import PlaceIcon from '@mui/icons-material/Place';

const Footer = () => {
  return (
    <Container sx={{ pt: 3 }}>
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
          <Stack direction="row" spacing={1} color="white">
            <PlaceIcon color="inherit" />
            <Box>
              <Typography gutterBottom variant="body1">
                <strong>Наш Адрес:</strong> 7-й микрорайон, 50а/1 стр
              </Typography>
              <Typography gutterBottom variant="body1">
                Октябрьский район, Бишкек, 720028
              </Typography>
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={3} gap={2} display="flex" flexDirection="column">
          <SocialMedia
            tiktok
            title="Мы в ТикТок"
            alt="ТикТок"
            href="https://www.tiktok.com/@techgear.logistics"
            imagePath={tt}
          />

          <SocialMedia
            instagram
            title="Мы в Инстаграм"
            alt="Инстаграм"
            href="https://www.instagram.com/cargo.878_kg"
            imagePath={inst}
          />

          <SocialMedia
            whatsapp
            title="Написать в WhatsApp"
            alt="WhatsApp"
            href="https://wa.me/996222601960?text=Здравствуйте,"
            imagePath={wtsp}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
