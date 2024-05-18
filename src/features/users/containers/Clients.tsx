import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { clientsState, isClientsLoading } from '../usersSlice';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ClientsItem from '../components/ClientsItem';
import { useEffect } from 'react';
import { fetchClients } from '../usersThunks';

const Clients = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(clientsState);
  const isLoading = useAppSelector(isClientsLoading);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);
  let content;

  if (isLoading) {
    content = <CircularProgress />;
  }

  content = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ textTransform: 'uppercase' }}>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              ID
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              Ф
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              И
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              О
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              Почта
            </TableCell>{' '}
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              Область
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              Нас. пункт
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              Адрес
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              Номер
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              ПВЗ
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.map((item) => (
            <ClientsItem
              key={item._id}
              marketId={item.marketId}
              email={item.email}
              pupID={item.pupID}
              firstName={item.firstName}
              lastName={item.lastName}
              middleName={item.middleName}
              phoneNumber={item.phoneNumber}
              region={item.region}
              settlement={item.settlement}
              address={item.address}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return <>{content}</>;
};

export default Clients;
