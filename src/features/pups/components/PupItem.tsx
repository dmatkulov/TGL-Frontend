import {Pup} from '../../../types/typePup';
import {Card, CardContent, Divider, Typography} from '@mui/material';
import React from 'react';

interface Props {
  pupItem: Pup;
}
const PupItem: React.FC<Props> = ({pupItem}) => {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pupItem.name}
        </Typography>
        <Divider/>
        <Typography variant="body2" color="text.secondary">
          {pupItem.region}/ {pupItem.settlement} {pupItem.address}
        </Typography>
        <Divider/>
        <Typography variant="body2" color="text.secondary">
          {pupItem.phoneNumber}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PupItem;