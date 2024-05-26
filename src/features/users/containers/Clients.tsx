import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  clientsState,
  isClientsLoading,
  isSingleClientLoading,
  singleClientState,
} from '../usersSlice';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import ClientsItem from '../components/ClientsItem';
import React, { useEffect, useState } from 'react';
import { fetchClients, fetchSingleClient } from '../usersThunks';
import ClientsTable from '../components/ClientsTable';
import { LoadingButton } from '@mui/lab';

const isInputValid = (marketIdString: string) => {
  const regex = /^\d{5}$/;
  return regex.test(marketIdString);
};

const Clients = () => {
  const [marketId, setMarketId] = useState<string>('');
  const dispatch = useAppDispatch();
  const state = useAppSelector(clientsState);
  const singleState = useAppSelector(singleClientState);
  const isLoading = useAppSelector(isClientsLoading);
  const [searched, setSearched] = useState<boolean>(false);
  const isSingleLoading = useAppSelector(isSingleClientLoading);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isInputValid(marketId)) {
      await dispatch(fetchSingleClient(marketId));
      setSearched(true);
    }
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarketId((prevState) => {
      prevState = e.target.value;
      return prevState;
    });
  };

  const clearFilter = async () => {
    setMarketId('');
    setSearched(false);
    await dispatch(fetchClients());
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component="form"
        gap={2}
        onSubmit={submitHandler}
        mb={4}
        pb={2}
      >
        <TextField
          type="number"
          size="small"
          onChange={inputChangeHandler}
          value={marketId}
          id="marketId"
          name="marketId"
          label="ID"
          sx={{ marginRight: '8px' }}
        />
        <LoadingButton
          variant="contained"
          loading={isSingleLoading}
          disabled={isSingleLoading || !isInputValid(marketId)}
          type="submit"
        >
          Поиск
        </LoadingButton>
        {searched && (
          <Button
            type="button"
            variant="contained"
            disabled={isSingleLoading || !isInputValid(marketId)}
            color="error"
            onClick={clearFilter}
          >
            Сбросить фильтр
          </Button>
        )}
      </Box>

      {isSingleLoading ? (
        <CircularProgress />
      ) : singleState && searched ? (
        <Box mb={4} pb={3} borderBottom="1px solid grey">
          <Typography gutterBottom>Результат поиска</Typography>
          <ClientsTable>
            <ClientsItem
              _id={singleState._id}
              marketId={singleState?.marketId}
              email={singleState?.email}
              pupID={singleState?.pupID}
              firstName={singleState?.firstName}
              lastName={singleState?.lastName}
              middleName={singleState?.middleName}
              phoneNumber={singleState?.phoneNumber}
              region={singleState?.region}
              settlement={singleState?.settlement}
              address={singleState?.address}
            />
          </ClientsTable>
        </Box>
      ) : (
        <></>
      )}

      {isLoading ? (
        <CircularProgress />
      ) : (
        <ClientsTable>
          {state.map((item) => (
            <ClientsItem
              _id={item._id}
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
        </ClientsTable>
      )}
    </>
  );
};

export default Clients;
