import {useAppDispatch} from '../../../app/hooks';
import {useNavigate} from 'react-router-dom';
import { WarehouseMutation} from '../../../types/types.Warehouses';
import {appRoutes} from '../../../utils/constants';
import {createWarehouse} from '../warehousesThunks';
import WarehouseForm from './WarehouseForm';

const NewWarehouse = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (warehouseMutation: WarehouseMutation) => {
    try {
      await dispatch(createWarehouse(warehouseMutation)).unwrap();
      navigate(appRoutes.adminWarehouses);
    } catch {
      //
    }
  };

  return (
    <>
      <WarehouseForm onSubmit={onFormSubmit} />
    </>
  );
};

export default NewWarehouse;