import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

interface Props {
  id: string;
  weight: number;
  price: number;
  date: string;
}

const HistoryCard: React.FC<Props> = ({ id, weight, price, date }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="subtitle1" gutterBottom>
              Номер:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {id}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" gutterBottom>
              Вес:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {weight} кг.
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" gutterBottom>
              Стоимость:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {price} сом
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" gutterBottom>
              Дата:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {date}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
