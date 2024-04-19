import { selectPups, selectPupsLoading } from '../pupsSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import { fetchPups } from '../pupsThunks';
import { CircularProgress, Stack } from '@mui/material';
import PupItem from './PupItem';

const PupList = () => {
  const loading = useAppSelector(selectPupsLoading);
  const dispatch = useAppDispatch();
  const pups = useAppSelector(selectPups);

  useEffect(() => {
    dispatch(fetchPups());
  }, [dispatch]);

  return (
    <>
      {loading && <CircularProgress />}
      <Stack>
        {pups.map((pup) => (
          <PupItem key={pup._id} pupItem={pup} />
        ))}
      </Stack>
    </>
  );
};

export default PupList;
