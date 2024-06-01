import React, { FC, useState } from 'react';
import { Box, Button, ListItem, TextField } from '@mui/material';
import { Banned } from '../../types/types.Banned';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { Edit, Remove } from '@mui/icons-material';
interface Props {
  banned: Banned;
}
const BannedItem: FC<Props> = ({ banned }) => {
  const name = banned.name;
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const permit = user?.role === 'admin' || user?.role === 'super';

  const [inputData, setInputData] = useState<string>(name);

  const deleteData = () => {
    dispatch();
  };

  const buttonGroup = (
    <Box display={permit ? 'block' : 'none'}>
      <Button
        variant="contained"
        startIcon={<Edit />}
        sx={{ marginLeft: '8px', marginRight: '8px' }}
      />
      <Button variant="contained" color="error" startIcon={<Remove />} />
    </Box>
  );

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const input = <TextField onChange={changeHandler} value={inputData} />;

  return (
    <ListItem>
      {permit ? input : name}
      {buttonGroup}
    </ListItem>
  );
};

export default BannedItem;
