import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectOneWarehouse, selectOneWarehouseFetching} from '../warehousesSlice';
import {useCallback, useEffect} from 'react';
import {fetchOneWarehouse, updateWarehouse} from '../warehousesThunks';
import {WarehouseMutation} from '../../../types/types.Warehouses';
import {CircularProgress, Grid} from '@mui/material';
import WarehouseForm from './WarehouseForm';
import {appRoutes} from '../../../utils/constants';


const EditWarehouse = () => {
  const navigate = useNavigate();
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const warehouse = useAppSelector(selectOneWarehouse);
  const isFetching = useAppSelector(selectOneWarehouseFetching);

  const doFetchOne = useCallback(async() => {
    if(!id) {
      return;
    }
    try {
      await dispatch(fetchOneWarehouse(id)).unwrap();
    } catch(e) {
      navigate('/404');
    }
  },[dispatch, id, navigate]);

  useEffect(() => {
    void doFetchOne();
  }, [doFetchOne]);

  const onFormSubmit = async (warehouseMutation: WarehouseMutation) => {
    dispatch(updateWarehouse({
      warehouseId: id,
      warehouseMutation,
    }));
    navigate(appRoutes.adminWarehouses);
  };

  let form = <CircularProgress />;

  if(!isFetching && warehouse) {
    const mutation = {
      ...warehouse,
      name: warehouse.name,
      address: warehouse.address,
      phoneNumber: warehouse.phoneNumber,
    };

    form = <WarehouseForm isEdit onSubmit={onFormSubmit} initialWarehouse={mutation}/>
  }
  return (
    <Grid>
      {form}
    </Grid>
  );
};

export default EditWarehouse;