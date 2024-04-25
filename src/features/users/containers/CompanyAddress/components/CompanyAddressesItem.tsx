import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { CompanyAddress } from '../../../../../types/types.CompanyAddress';

const CompanyAddressesItem: FC<CompanyAddress> = ({
  _id,
  address,
  postCode,
  district,
  city,
}) => {
  const deleteHandler = async () => {};
  const editHandler = async () => {};

  return (
    <Box>
      <Box>
        <Typography>{address}</Typography>
        <Typography>{postCode}</Typography>
        <Typography>{district}</Typography>
        <Typography>{city}</Typography>
      </Box>
      <Box>
        <Button onClick={deleteHandler} variant="contained" color="error">
          Delete
        </Button>
        <Button onClick={editHandler} variant="contained" color="warning">
          Edit
        </Button>
      </Box>
    </Box>
  );
};

export default CompanyAddressesItem;
