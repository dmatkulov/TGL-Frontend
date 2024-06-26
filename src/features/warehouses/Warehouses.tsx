import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { isWarehousesLoading, warehousesState } from './warehousesSlice';
import { useEffect, useState } from 'react';
import { fetchWarehouseData } from './warehousesThunks';
import { selectUser } from '../users/usersSlice';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Slide, toast } from 'react-toastify';

const Warehouses = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(warehousesState);
  const isLoading = useAppSelector(isWarehousesLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchWarehouseData());
  }, [dispatch]);

  const [textToCopy, setTextToCopy] = useState('');

  const onCopy = async () => {
    toast.success('Скопировано', {
      autoClose: 500,
      hideProgressBar: true,
      pauseOnHover: false,
      draggable: false,
      transition: Slide,
    });
  };

  useEffect(() => {
    if (state.length > 0 && user?.marketId) {
      const string =
        state[0].name +
        ' ' +
        state[0].phoneNumber +
        ' ' +
        state[0].address +
        user?.marketId;
      setTextToCopy(string);
    }
  }, [state, user]);

  let content;

  if (state.length < 1) {
    content = (
      <Typography>
        В настоящее время нет доступных складов в Китае. Проверьте позже
      </Typography>
    );
  } else {
    content = (
      <>
        {state.map((elem) => (
          <Box
            key={elem._id}
            sx={{
              pb: 4,
              mb: 4,
              '--Grid-borderWidth': '1px',
              borderBottom: 'var(--Grid-borderWidth) solid',
              borderColor: 'divider',
            }}
          >
            <Typography>收货人：{elem.name}</Typography>
            <Typography>电话：{elem.phoneNumber}</Typography>
            <Typography sx={{ mb: 3 }}>
              {elem.address + user?.marketId}
            </Typography>
            <CopyToClipboard
              text={textToCopy}
              onCopy={onCopy}
              options={{ message: 'fsdfs' }}
            >
              <Button variant="contained">Скопировать</Button>
            </CopyToClipboard>
          </Box>
        ))}
      </>
    );
  }

  return <Box>{isLoading ? <CircularProgress /> : content}</Box>;
};

export default Warehouses;
