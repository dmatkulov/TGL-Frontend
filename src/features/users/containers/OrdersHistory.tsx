import { Grid } from '@mui/material';
import HistoryCard from '../components/HistoryCard';
import PageTitle from '../components/PageTitle';

const OrdersHistory = () => {
  return (
    <>
      <PageTitle title="История заказов" />
      <Grid container direction="column" spacing={1}>
        {/* Пока что прописал вручную несколько компонентов, как только бэк будет готов, это все будет мэпиться, и структуру пропсов тоже можно будет изменить
        т.е не передавать отдельно айди, вес, сумму и дату, а только объект, и внутри компонента уже все будет подставляться
        */}
        <Grid item xs={12}>
          <HistoryCard
            id={'123321'}
            weight={2}
            price={345}
            date={'12.07.2024'}
          />
        </Grid>
        <Grid item xs={12}>
          <HistoryCard
            id={'123321'}
            weight={2}
            price={345}
            date={'12.07.2024'}
          />
        </Grid>
        <Grid item xs={12}>
          <HistoryCard
            id={'123321'}
            weight={2}
            price={345}
            date={'12.07.2024'}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default OrdersHistory;
