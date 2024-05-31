import { FC } from 'react';
import { ListItem } from '@mui/material';
import { Banned } from '../../types/types.Banned';
interface Props {
  banned: Banned;
}
const BannedItem: FC<Props> = ({ banned }) => {
  const name = banned.name;
  return <ListItem>{name}</ListItem>;
};

export default BannedItem;
