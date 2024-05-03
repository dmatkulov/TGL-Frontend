import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPrice, selectPriceLoading } from './pricesSlice';
import { fetchPrice } from './pricesThunks';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { selectUser } from '../users/usersSlice';
import PageTitle from '../users/components/PageTitle';

const Price = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const price = useAppSelector(selectPrice);
  const isFetching = useAppSelector(selectPriceLoading);

  const doFetchOne = useCallback(async () => {
    try {
      await dispatch(fetchPrice()).unwrap();
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  useEffect(() => {
    void doFetchOne();
  }, [doFetchOne]);

  let form = <CircularProgress />;

  if (!isFetching && price) {
    form = (
      <>
        <Box mb={4}>
          <Typography>
            Цена за доставку: <strong>{price.deliveryPrice} СОМ</strong>
          </Typography>
          <Typography>
            Курс доллара: <strong>{price.exchangeRate} USD</strong>
          </Typography>
        </Box>
        {user?.role === 'super' && (
          <Grid item>
            <Button variant="contained">Редактировать</Button>
          </Grid>
        )}
      </>
    );
  } else if (!price && !isFetching) {
    form = (
      <>
        <Box mb={4}>
          <Typography>
            В настоящий момент цена за доставку не установлена
          </Typography>
        </Box>
        {user?.role === 'super' && (
          <Grid item>
            <Button variant="contained">Установить</Button>
          </Grid>
        )}
      </>
    );
  }

  return (
    <Grid container direction="column">
      <PageTitle title="Курс доллара и цена за доставку" />
      {form}
    </Grid>
  );
};

export default Price;
