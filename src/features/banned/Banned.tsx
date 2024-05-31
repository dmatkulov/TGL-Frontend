import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { bannedState, isBannedLoading } from './bannedSlice';
import { CircularProgress, List, Typography } from '@mui/material';
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

  isLoading ? (
    (content = <CircularProgress />)
  ) : isEmpty ? (
    <Typography>Pusto</Typography>
  ) : (
    <List dense={true}>
      {state.map((item) => (
        <BannedItem banned={item} />
      ))}
    </List>
  );

  return content;
};

export default Banned;
