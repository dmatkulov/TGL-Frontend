import { useEffect, useState } from 'react';
import {
  CompanyAddressEditRequest,
  CompanyAddressMutation,
} from '../../../types/types.CompanyAddress';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  isCompanyAddressesCreating,
  selectCompanyAddress,
} from '../companyAddressesSlice';
import {
  fetchCompanyAddresses,
  fetchOneAddress,
  updateCompanyAddress,
  uploadCompanyAddress,
} from '../companyAddressThunks';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

const initialState: CompanyAddressMutation = {
  address: '',
  city: '',
  postCode: '',
  district: '',
};

interface Props {
  open: boolean;
  edit: boolean;
  onClose: () => void;
  setEdit: () => void;
  id: string;
}

const CompanyDialog: React.FC<Props> = ({
  open,
  edit,
  onClose,
  setEdit,
  id,
}) => {
  const [state, setState] = useState<CompanyAddressMutation>(initialState);
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectCompanyAddress);
  const isCreating = useAppSelector(isCompanyAddressesCreating);

  useEffect(() => {
    if (edit) {
      dispatch(fetchOneAddress(id));
    }
  }, [dispatch, edit, id]);

  useEffect(() => {
    if (address) {
      setState(address);
    }
  }, [address]);

  useEffect(() => {
    if (!open) {
      setState(initialState);
    }
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (edit) {
      const tempVar: CompanyAddressEditRequest = {
        id: id,
        data: state,
      };
      await dispatch(updateCompanyAddress(tempVar));
    } else if (!edit) {
      await dispatch(uploadCompanyAddress(state));
    }
    setEdit();
    handleClose();
    await dispatch(fetchCompanyAddresses());
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Новый адрес:</DialogTitle>
      <DialogContent
        sx={{
          mt: '20px',
        }}
      >
        <form autoComplete="off" onSubmit={submitFormHandler}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12} container gap={'10px'}>
              <TextField
                fullWidth
                required
                name="address"
                label="Адрес"
                type="text"
                value={state.address}
                onChange={inputChangeHandler}
              ></TextField>
              <TextField
                fullWidth
                required
                name="city"
                label="Город"
                type="text"
                value={state.city}
                onChange={inputChangeHandler}
              ></TextField>
              <TextField
                fullWidth
                required
                name="postCode"
                label="Индекс"
                type="text"
                value={state.postCode}
                onChange={inputChangeHandler}
              ></TextField>
              <TextField
                fullWidth
                required
                name="district"
                label="Район"
                type="text"
                value={state.district}
                onChange={inputChangeHandler}
              ></TextField>
            </Grid>

            <Grid item xs>
              <LoadingButton
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                disabled={isCreating}
                loading={isCreating}
              >
                {edit ? 'Обновить' : 'Добавить'}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyDialog;
