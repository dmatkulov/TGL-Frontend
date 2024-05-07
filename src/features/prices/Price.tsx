import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPrice, selectPriceLoading } from './pricesSlice';
import { fetchPrice } from './pricesThunks';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { selectUser } from '../users/usersSlice';
import PageTitle from '../users/components/PageTitle';
import EditPrice from './EditPrice';
import NewPrice from './NewPrice';

const Price = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const price = useAppSelector(selectPrice);
  const isFetching = useAppSelector(selectPriceLoading);

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

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

  const toggleOpen = () => {
    setOpen(true);
  };
  const handleClose = async () => {
    await doFetchOne();
    setOpen(false);
  };

  let form = <CircularProgress />;

  if (!isFetching && price) {
    form = (
      <>
        <Box mb={4}>
          <Typography>
            Цена за доставку: <strong>{price.deliveryPrice} USD</strong>
          </Typography>
          <Typography>
            Курс доллара: <strong>{price.exchangeRate} USD</strong>
          </Typography>
        </Box>
        {user?.role === 'super' && (
          <Grid item>
            <Button
              variant="contained"
              onClick={() => {
                setEdit(true);
                toggleOpen();
              }}
            >
              Редактировать
            </Button>
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
            <Button variant="contained" onClick={toggleOpen}>
              Установить
            </Button>
          </Grid>
        )}
      </>
    );
  }

  return (
    <Grid container direction="column">
      <PageTitle title="Курс доллара и цена за доставку" />
      {form}

      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>{edit ? 'Редактирование' : 'Создать'}</DialogTitle>
        <DialogContent
          sx={{
            mt: '20px',
          }}
        >
          {price && <EditPrice onClose={handleClose} price={price} />}
          {!price && <NewPrice onClose={handleClose} />}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Price;
