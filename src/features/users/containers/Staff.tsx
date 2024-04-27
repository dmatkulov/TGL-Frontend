import PageTitle from '../components/PageTitle';
import { appRoutes } from '../../../utils/constants';
import { Button, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectGetStaffDataLoading,
  selectStaffData,
  selectUser,
} from '../usersSlice';
import { getStaffData } from '../usersThunks';
import StaffItem from '../components/StaffItem';

const Staff: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectStaffData);
  const loading = useAppSelector(selectGetStaffDataLoading);
  const user = useAppSelector(selectUser);

  const [getAdminLoading, setAdminLoading] = useState<boolean>(false);
  const [getManagerLoading, setManagerLoading] = useState<boolean>(false);
  const [getClientLoading, setClientLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getStaffData());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!loading) {
      setAdminLoading(false);
      setManagerLoading(false);
      setClientLoading(false);
    }
  }, [loading]);

  const handleAdminButtonClick = () => {
    dispatch(getStaffData({ role: 'admin' }));
    setAdminLoading(true);
  };

  const handleManagerButtonClick = () => {
    dispatch(getStaffData({ role: 'manager' }));
    setManagerLoading(true);
  };

  const handleClientButtonClick = () => {
    dispatch(getStaffData({ role: 'client' }));
    setClientLoading(true);
  };

  let items: React.ReactNode = <CircularProgress />;

  if (!loading) {
    items = users.map((item) => <StaffItem key={item._id} user={item} />);
  }

  return (
    <>
      <Grid container justifyContent="space-between" spacing={2}>
        <PageTitle title="Сотрудники" />
        {user?.role === 'super' && (
          <Button
            variant="contained"
            onClick={() => navigate(appRoutes.addStaff)}
          >
            Создать сотрудника
          </Button>
        )}
      </Grid>
      <Grid container sx={{ marginTop: 3 }}>
        <Button
          sx={{ marginRight: 2 }}
          variant="contained"
          onClick={handleAdminButtonClick}
          disabled={getAdminLoading}
          startIcon={
            getAdminLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : null
          }
        >
          Админы
        </Button>
        <Button
          sx={{ marginRight: 2 }}
          variant="contained"
          onClick={handleManagerButtonClick}
          disabled={getManagerLoading}
          startIcon={
            getManagerLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : null
          }
        >
          Менеджеры
        </Button>
        <Button
          variant="contained"
          onClick={handleClientButtonClick}
          disabled={getClientLoading}
          startIcon={
            getClientLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : null
          }
        >
          Клиенты
        </Button>
      </Grid>
      <Grid>{items}</Grid>
    </>
  );
};

export default Staff;
