import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { CompanyAddress } from '../../../types/types.CompanyAddress';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  deleteCompanyAddress,
  fetchCompanyAddresses,
} from '../companyAddressThunks';
import {
  isCompanyAddressesCreating,
  isCompanyAddressesDeleting,
} from '../companyAddressesSlice';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../utils/constants';
import { selectUser } from '../../users/usersSlice';

const CompanyAddressesItem: FC<CompanyAddress> = ({
  _id,
  address,
  postCode,
  district,
  city,
  editHandler,
}) => {
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(isCompanyAddressesDeleting);
  const isCreating = useAppSelector(isCompanyAddressesCreating);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const deleteHandler = async () => {
    await dispatch(deleteCompanyAddress(_id));
    await dispatch(fetchCompanyAddresses());
    navigate(appRoutes.adminCompanyAddress);
  };

  return (
    <Grid item xs={12} sm={6} lg={4} sx={{ padding: '10px' }}>
      <Box
        sx={{
          border: '3px solid #5F9EA0',
          borderRadius: '15px',
          padding: '10px',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Город: {city}</Typography>
          <Typography variant="h6">Адрес: {address}</Typography>
          <Typography variant="h6">Почтовый индекс: {postCode}</Typography>
          <Typography variant="h6">Район: {district}</Typography>
        </Box>
        <Grid container gap={2}>
          {user && user?.role === 'super' && (
            <LoadingButton
              loading={isCreating}
              onClick={editHandler}
              disabled={isCreating}
              variant="contained"
            >
              Редактировать
            </LoadingButton>
          )}
          {user && user?.role === 'super' && (
            <LoadingButton
              loading={isDeleting}
              disabled={isDeleting}
              onClick={deleteHandler}
              variant="contained"
              color="error"
            >
              Удалить
            </LoadingButton>
          )}
        </Grid>
      </Box>
    </Grid>
  );
};

export default CompanyAddressesItem;
