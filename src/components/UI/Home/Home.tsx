import { Navigate } from 'react-router-dom';
import { appRoutes } from '../../../utils/constants';

const Home = () => {
  return <Navigate to={appRoutes.register} />;
};

export default Home;
