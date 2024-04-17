import {Box, Grid, MenuItem, Select, TextField} from '@mui/material';

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
              label="номер трека"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="pup"
              label="ПВЗ"
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              required
              fullWidth
            >
              <MenuItem>
                Отправлен
              </MenuItem>
              <MenuItem>
                В китае
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ShipmentsForm;