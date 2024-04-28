import {
  Box,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography, useMediaQuery,
} from '@mui/material';
import img from '..//..//../assets/car.png';
import tt from '..//..//../assets/tt.svg';
import inst from '..//..//../assets/instagram.svg';
import wtsp from '..//..//../assets/whatsapp.svg';
import SocialMedia from './SocialMedia';
import PlaceIcon from '@mui/icons-material/Place';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchCompanyAddresses } from '../../../features/companyAddress/companyAddressThunks';
import { companyAddressState } from '../../../features/companyAddress/companyAddressesSlice';

const Footer = () => {
  const isSmallScreen = useMediaQuery('(max-width:660px)');
        
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(companyAddressState);
  const isEmpty = addresses.length === 0;

  useEffect(() => {
    dispatch(fetchCompanyAddresses());
  }, [dispatch]);

  let social = (
    <>
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
    </>
  );

  return (
    <Container sx={{ pt: 3 }} maxWidth="xl">
      <Grid
        container
        sx={{
          pt: 3,
          pb: 4,
        }}
      >
        <Grid item xs={3} sx={{ display: isSmallScreen ? 'none' : '' }}>
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
              {isEmpty ? (
                <Typography>Адрес обновляется</Typography>
              ) : (
                <>
                  <Typography gutterBottom variant="body1">
                    <strong>Наш Адрес:</strong>
                    {addresses[0].address}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    {addresses[0].district}, {addresses[0].city},{' '}
                    {addresses[0].postCode}
                  </Typography>
                </>
              )}
            </Box>
          </Stack>
        </Grid>

        { isSmallScreen ?
          <Grid container gap={2} display="flex" flexDirection="row" wrap="wrap">
            { social }
          </Grid> :
          <Grid item xs={3} gap={2} display="flex" flexDirection="column">
            { social }
          </Grid>}
      </Grid>
    </Container>
  );
};

export default Footer;
