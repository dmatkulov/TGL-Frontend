import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  companyAddressState,
  isCompanyAddressesLoading,
} from './companyAddressesSlice';
import CompanyAddressesItem from './components/CompanyAddressesItem';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchCompanyAddresses } from './companyAddressThunks';
import CompanyDialog from './components/CompanyDialog';
import { selectUser } from '../users/usersSlice';

const styleBoxSpinner = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '5rem',
};

const CompanyAddresses = () => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(companyAddressState);
  const isLoading = useAppSelector(isCompanyAddressesLoading);
  const user = useAppSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    dispatch(fetchCompanyAddresses());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const editHandler = async (id: string) => {
    setOpen(true);
    setEditToggle(true);
    setId(id);
  };

  let content;

  if (addresses.length < 1) {
    content = (
      <Typography sx={{ paddingTop: 1 }}>Нет доступных адресов</Typography>
    );
  } else {
    content = (
      <Grid container spacing={3} sx={{ mt: '15px' }}>
        {addresses.map((item) => (
          <CompanyAddressesItem
            key={item._id}
            address={item.address}
            city={item.city}
            _id={item._id}
            district={item.district}
            postCode={item.postCode}
            editHandler={() => editHandler(item._id)}
          />
        ))}
      </Grid>
    );
  }

  return (
    <>
      <Box>
        {user && user?.role === 'super' && (
          <Button variant="contained" onClick={handleClickOpen}>
            Добавить адрес
          </Button>
        )}
      </Box>
      {isLoading ? (
        <Box style={styleBoxSpinner}>
          <CircularProgress size={100} />
        </Box>
      ) : (
        content
      )}
      <CompanyDialog
        open={open}
        onClose={() => setOpen(false)}
        edit={editToggle}
        setEdit={() => setEditToggle(false)}
        id={id}
      />
    </>
  );
};

export default CompanyAddresses;
