import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Tab,
  TablePagination,
  Tabs,
  TextField, Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  clearEmployee,
  selectEmployee,
  selectGetStaffDataLoading,
  selectStaffData,
  selectUser,
} from '../usersSlice';
import {createStaff, getEmployee, getStaffData, updateStaff} from '../usersThunks';
import StaffItem from '../components/StaffItem';
import AddStaff from './AddStaff';
import { IStaff, UsersRequestParams } from '../../../types/types.User';
import TablePaginationActions from '../../shipments/components/TablePaginationActions';
import StaffTable from '../components/StaffTable';

const Staff: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectStaffData);
  const loading = useAppSelector(selectGetStaffDataLoading);
  const user = useAppSelector(selectUser);
  const employee = useAppSelector(selectEmployee);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [email, setEmail] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setTabIndex(newValue);
    void fetchStaffData(newValue);
  };

  const tabs = ['admin', 'manager'];

  const fetchStaffData = useCallback(
    async (roleIndex: number) => {
      let role: string;
      switch (roleIndex) {
        case 0:
          role = 'admin';
          break;
        case 1:
          role = 'manager';
          break;
        default:
          role = 'admin';
          break;
      }
      if (role === 'client' && user?.role === 'manager' && user.region) {
        const params: UsersRequestParams = {
          region: user.region.name,
        };
        await dispatch(getStaffData(params));
      } else {
        await dispatch(getStaffData({ role }));
      }
    },
    [dispatch, user],
  );

  useEffect(() => {
    setTabIndex(0);
    void fetchStaffData(0);
    window.scrollTo(0, 0);
  }, [fetchStaffData]);

  const submitNewStaff = async (staffMutation: IStaff) => {
    try {
      await dispatch(createStaff(staffMutation)).unwrap();
      const index = tabs.findIndex((tab) => tab === staffMutation.role);
      setTabIndex(index);
      void fetchStaffData(index);
      handleClose();
    } catch {
      //
    }
  };

  const submitEdited = async (id: string, userMutation: IStaff) => {
    try {
      await dispatch(
        updateStaff({
          userId: id,
          userMutation,
        }),
      );
      const index = tabs.findIndex((tab) => tab === userMutation.role);
      setTabIndex(index);
      void fetchStaffData(index);
    } catch {
      //
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    event?.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedStaff = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const inputChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(getEmployee(email));
  };

  const clearFilter = async () => {
    setEmail('');
    dispatch(clearEmployee());
  };

  let tableContent: React.ReactNode = <CircularProgress />;

  if (!loading) {
    tableContent = (
      <>
        {employee ? (
          <>
            <Typography gutterBottom>Результат поиска</Typography>
            <StaffTable>
              <StaffItem
                key={employee._id}
                user={employee}
                onSubmit={submitEdited}
                onDelete={() => fetchStaffData(tabIndex)}
              />
            </StaffTable>
            <Typography sx={{ borderBottom: '1px solid #000' }} />
          </>
        ) : ''}
        <StaffTable>
          {paginatedStaff.map((item) => (
            <StaffItem
              key={item._id}
              user={item}
              onSubmit={submitEdited}
              onDelete={() => fetchStaffData(tabIndex)}
            />
          ))}
        </StaffTable>
        <TablePagination
          component="div"
          sx={{ ml: 'auto' }}
          rowsPerPageOptions={[5, 10, 15, 20]}
          labelRowsPerPage="На странице"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </>
    );
  }

  return (
    <>
      <Grid container justifyContent="space-between" spacing={2} alignItems="flex-start">
        <Box component="form" onSubmit={handleForm}>
          <TextField
            name="email"
            label="Найти сотрудника по email"
            type="email"
            value={email}
            onChange={inputChangeEmail}
          />
          <Button type="submit" variant="contained" sx={{ mr: 2, mt: 1, ml: 1 }}>
            Найти
          </Button>
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={clearFilter}
            sx={{ mt: 1 }}
          >
            Сбросить фильтр
          </Button>
        </Box>
        {user?.role === 'super' && (
          <Button variant="contained" onClick={handleClickOpen} sx={{ mt: 1 }}>
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
        </Tabs>
      </Grid>
      <Grid mt={2}>{tableContent}</Grid>
      <AddStaff open={open} onClose={handleClose} onSubmit={submitNewStaff} />
    </>
  );
};

export default Staff;