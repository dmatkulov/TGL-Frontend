import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { isWarehousesLoading, warehousesState } from './warehousesSlice';
import { useEffect, useState } from 'react';
import { fetchWarehouseData } from './warehousesThunks';
import { selectUser } from '../users/usersSlice';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Warehouses = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(warehousesState);
  const isLoading = useAppSelector(isWarehousesLoading);
  const user = useAppSelector(selectUser);

  const [textToCopy, setTextToCopy] = useState('');

  const onCopy = async () => {
    if (textToCopy === '' && user?.marketId) {
      const string =
        state[0].name +
        ' ' +
        state[0].phoneNumber +
        ' ' +
        state[0].address +
        user?.marketId;
      setTextToCopy(string);
    }
  };

  useEffect(() => {
    dispatch(fetchWarehouseData());
  }, [dispatch]);

  let content;

  if (state.length < 1 || user?.marketId) {
    content = (
      <Typography>
        В настоящее время нет доступных складов в Китае. Проверьте позже
      </Typography>
    );
  }
  if (state.length > 1) {
    content = (
      <Typography>
        Есть несколько складов. Нужно добавить селект для выбора одного.
      </Typography>
    );
  }
  if (state.length === 1) {
    content = (
      <>
        <Typography>收货人：{state[0].name}</Typography>
        <Typography>电话：{state[0].phoneNumber}</Typography>
        <Typography>{state[0].address + user?.marketId}</Typography>
        <CopyToClipboard text={textToCopy} onCopy={onCopy}>
          <Button>Copy</Button>
        </CopyToClipboard>
      </>
    );
  }
  return <Box>{isLoading ? <CircularProgress /> : content}</Box>;
};

export default Warehouses;
