import { Outlet } from 'react-router-dom';
import AppToolbar from '../components/UI/AppToolbar/AppToolbar';
import Footer from '../components/UI/Footer/Footer';
import { Box, Container, CssBaseline } from '@mui/material';

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <Container component="main" sx={{ minHeight: '70vh', pt: 4, mb: 4 }}>
        <Outlet />
      </Container>
      <Box component="footer" bgcolor="#5F9EA0">
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
