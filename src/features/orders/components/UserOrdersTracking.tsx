import {
  Box, Button,
  Card,
  CardContent,
  Grid, TextField, Typography,
  useMediaQuery,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import React, { useState } from 'react';
import { searchByTrack } from '../../shipments/shipmentsThunk';
import { selectOneOrder } from '../ordersSlice';
import ShipmentsCard from '../../shipments/components/ShipmentsCard';

const UserOrdersTracking = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector(selectOneOrder);
  const isMediumScreen = useMediaQuery('(max-width:1230px)');
  const isSmallScreen = useMediaQuery('(max-width:1000px)');
  const isExtraSmallScreen = useMediaQuery('(max-width:480px)');

  const cards = Array.from({ length: 3 });
  const [state, setState] = useState<string>('');
  const [searched, setSearched] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const searchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    await dispatch(searchByTrack(state));
  };

  return (
    <>
      <Box component="form" onSubmit={searchOrder}>
        <TextField
          required
          name="search"
          label="поиск по трек номеру"
          sx={{ width: isExtraSmallScreen ? '175px' : isSmallScreen ? '320px' : '500px', mt: 1 }}
          value={state}
          onChange={handleChange}
        />
        <Button type="submit" sx={{ ml: 2, mt: 2 }} variant="contained">
          Поиск
        </Button>
      </Box>

      {cards.map((_, index) => (
        <Card sx={{ mt: 2, mb: 2 }} key={index}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid
                container
                spacing={ isExtraSmallScreen ? 2 : isMediumScreen ? 4 : 6 }
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
      {order && <ShipmentsCard shipment={order} />}
      {searched && !order && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          По вашему запросу ничего не найдено.
        </Typography>
      )}
    </>
  );
};

export default UserOrdersTracking;
