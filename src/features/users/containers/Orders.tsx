import PageTitle from '../components/PageTitle';
import OrdersTable from '../../orders/components/OrdersTable';

const Orders = () => {
  return (
    <>
      <PageTitle title="Мои заказы" />
      <OrdersTable />
    </>
  );
};

export default Orders;
