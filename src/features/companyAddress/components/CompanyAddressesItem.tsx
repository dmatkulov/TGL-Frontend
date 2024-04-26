import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { CompanyAddress } from '../../../types/types.CompanyAddress';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteCompanyAddress } from '../companyAddressThunks';
import { isCompanyAddressesDeleting } from '../companyAddressesSlice';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../utils/constants';

const CompanyAddressesItem: FC<CompanyAddress> = ({
  _id,
  address,
  postCode,
  district,
  city,
}) => {
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(isCompanyAddressesDeleting);
  const navigate = useNavigate();
  const deleteHandler = async () => {
    await dispatch(deleteCompanyAddress(_id));
    navigate(appRoutes.adminCompanyAddress);
  };

  return (
    <Box>
      <Box>
        <Typography>{address}</Typography>
        <Typography>{postCode}</Typography>
        <Typography>{district}</Typography>
        <Typography>{city}</Typography>
      </Box>
      <Box>
        <LoadingButton
          loading={isDeleting}
          disabled={isDeleting}
          onClick={deleteHandler}
          variant="contained"
          color="error"
        >
          Delete
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default CompanyAddressesItem;
