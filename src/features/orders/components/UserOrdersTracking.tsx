import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const UserOrdersTracking = () => {
  const cards = Array.from({ length: 3 });

  return (
    <>
      <Box component="form">
        <TextField
          required
          name="search"
          label="поиск по трек номеру"
          sx={{ width: '500px', mt: 1 }}
        />
        <Button type="submit" sx={{ ml: 2, mt: 2 }} variant="contained">
          Поиск
        </Button>
      </Box>

      {cards.map((_) => (
        <Card sx={{ mt: 2, mb: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid
                container
                spacing={6}
                sx={{ ml: 1, borderBottom: '1px solid #000' }}
              >
                <Grid item>
                  <Typography>Объем:</Typography>
                </Grid>
                <Grid item>
                  <Typography>вес - 2кг,</Typography>
                </Grid>
                <Grid item>
                  <Typography>ширина - 9м,</Typography>
                </Grid>
                <Grid item>
                  <Typography>высота - 200м,</Typography>
                </Grid>
                <Grid item>
                  <Typography>длинна - 2км</Typography>
                </Grid>
              </Grid>
              <Grid item xs={7}>
                <Typography gutterBottom>
                  Трекинговый номер: sdlwpd209093so
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography gutterBottom>статус: КР_ПРИБЫЛО</Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography gutterBottom>цена: 200 сом</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default UserOrdersTracking;
