import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  companyAddressState,
  isCompanyAddressesLoading,
} from './companyAddressesSlice';
import CompanyAddressesItem from './components/CompanyAddressesItem';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { fetchCompanyAddresses } from './companyAddressThunks';

const CompanyAddresses = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(companyAddressState);
  const isLoading = useAppSelector(isCompanyAddressesLoading);

  useEffect(() => {
    dispatch(fetchCompanyAddresses());
  }, [dispatch]);

  let content;

  if (state.length < 1) {
    content = <Typography>Нет доступных адресов</Typography>;
  } else {
    content = (
      <Box>
        {state.map((item) => (
          <CompanyAddressesItem
            key={item._id}
            address={item.address}
            city={item.city}
            _id={item._id}
            district={item.district}
            postCode={item.postCode}
          />
        ))}
      </Box>
    );
  }

  return isLoading ? <CircularProgress /> : content;
};

export default CompanyAddresses;
