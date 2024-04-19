import PageTitle from '../components/PageTitle';
import UserOrdersTracking from '../../orders/components/UserOrdersTracking';

const Tracking = () => {
  return (
    <>
      <PageTitle title="Трекинг по номеру" />
      <UserOrdersTracking />
    </>
  );
};

export default Tracking;
