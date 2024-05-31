import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { bannedState, isBannedLoading } from './bannedSlice';
import { Alert, CircularProgress, List, Typography } from '@mui/material';
import BannedItem from './BannedItem';
import { useEffect } from 'react';
import { fetchBanned } from './bannedThunks';

const Banned = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isBannedLoading);
  const state = useAppSelector(bannedState);
  const isEmpty = state.length < 1;

  useEffect(() => {
    dispatch(fetchBanned());
  }, [dispatch]);

  let content;

  isLoading
    ? (content = <CircularProgress />)
    : isEmpty
      ? (content = (
          <Typography>
            Товаров или категорий запрещенных к ввозу не найдено
          </Typography>
        ))
      : (content = (
          <>
            <Alert severity="info" sx={{ marginTop: '8px' }}>
              Товары и категории товаров частично или полностью запрещенные к
              ввозу на территорию КР
            </Alert>
            <List dense={true}>
              {state.map((item) => (
                <BannedItem key={item._id} banned={item} />
              ))}
            </List>
          </>
        ));

  return content;
};

export default Banned;
