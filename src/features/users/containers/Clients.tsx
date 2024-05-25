import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  clientsState,
  isClientsLoading,
  isSingleClientLoading,
  singleClientState,
} from '../usersSlice';
import { Box, CircularProgress, TextField } from '@mui/material';
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
  const isEmpty = singleState === null;
  const isSingleLoading = useAppSelector(isSingleClientLoading);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isInputValid(marketId)) {
      await dispatch(fetchSingleClient(marketId));
      setMarketId('');
    }
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarketId((prevState) => {
      prevState = e.target.value;
      return prevState;
    });
  };

  return (
    <>
      <Box mb={2} pb={2} borderBottom="1px solid grey">
        <Box
          display="flex"
          alignItems="center"
          component="form"
          onSubmit={submitHandler}
        >
          <TextField
            type="number"
            onChange={inputChangeHandler}
            value={marketId}
            id="marketId"
            name="marketId"
            label="ID"
            sx={{ marginRight: '8px' }}
          ></TextField>
          <LoadingButton
            variant="contained"
            loading={isSingleLoading}
            disabled={isSingleLoading || !isInputValid(marketId)}
            type="submit"
          >
            Поиск
          </LoadingButton>
        </Box>
        {isSingleLoading ? (
          <CircularProgress />
        ) : (
          <ClientsTable>
            {isEmpty ? (
              <></>
            ) : (
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
            )}
          </ClientsTable>
        )}
      </Box>
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
