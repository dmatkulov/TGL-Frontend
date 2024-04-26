import { Pup } from '../../../types/types.Pup';
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import React from 'react';

interface Props {
  pupItem: Pup;
}
const PupItem: React.FC<Props> = ({ pupItem }) => {
  return (
    <Grid m={1}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pupItem.name}
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary">
            <b>Адрес:</b> {pupItem.region.name} {pupItem.settlement}{' '}
            {pupItem.address}
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary">
            <b>Тел:</b> +{pupItem.phoneNumber}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PupItem;
