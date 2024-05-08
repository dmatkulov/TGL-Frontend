import PageTitle from '../components/PageTitle';
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectGetStaffDataLoading,
  selectStaffData,
  selectUser,
} from '../usersSlice';
import { getStaffData } from '../usersThunks';
import StaffItem from '../components/StaffItem';
import AddStaff from './AddStaff';

const Staff: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectStaffData);
  const loading = useAppSelector(selectGetStaffDataLoading);
  const user = useAppSelector(selectUser);

  const [tabIndex, setTabIndex] = useState<number>(0);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setTabIndex(newValue);
    fetchStaffData(newValue);
  };

  // const tabs = ['admin', 'manager', 'client'];

  const fetchStaffData = (roleIndex: number) => {
    let role = '';
    switch (roleIndex) {
      case 0:
        role = 'admin';
        break;
      case 1:
        role = 'manager';
        break;
      case 2:
        role = 'client';
        break;
      default:
        role = 'admin';
        break;
    }
    dispatch(getStaffData({ role }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let tableContent: React.ReactNode = <CircularProgress />;

  if (!loading) {
    tableContent = (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ textTransform: 'uppercase' }}>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Роль
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Имя
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Фамилия
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Адрес
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Номер телефона
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <StaffItem key={item._id} user={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        spacing={2}
        alignItems="flex-start"
      >
        <PageTitle title="Сотрудники" />
        {user?.role === 'super' && (
          <Button variant="contained" onClick={handleClickOpen}>
            Создать сотрудника
          </Button>
        )}
      </Grid>
      <Grid container sx={{ marginTop: 3 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Админы" />
          <Tab label="Менеджеры" />
          <Tab label="Клиенты" />
        </Tabs>
      </Grid>
      <Grid mt={2}>{tableContent}</Grid>
      <AddStaff open={open} onClose={handleClose} />
    </>
  );
};

export default Staff;
