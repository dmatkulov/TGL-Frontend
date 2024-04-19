import { Box, Button, Grid, TextField } from '@mui/material';

const ShipmentsForm = () => {
  return (
    <>
      <Box component="form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="userMarketId"
              label="Маркет"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="trackNumber"
              label="Номер трека"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="weight"
              label="Масса"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="height"
              label="Высота"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="length"
              label="Длина"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="width"
              label="Ширина"
              type="number"
            />
          </Grid>
        </Grid>
        <Button type="submit" sx={{ mt: 3 }}>Add shipment</Button>
      </Box>
    </>
  );
};

export default ShipmentsForm;
