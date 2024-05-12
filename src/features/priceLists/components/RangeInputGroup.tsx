import { FC } from 'react';
import { Box, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { PriceListRangesInputData } from '../../../types/types.PriceLists';
import InputAdornment from '@mui/material/InputAdornment';

const RangeInputGroup: FC<PriceListRangesInputData> = ({
  rangeValue,
  rangeName,
  valueName,
  rangeChangeHandler,
  valueChangeHandler,
  deleteHandler,
  rangeId,
  valueId,
  valueValue,
}) => {
  return (
    <Box>
      <TextField
        type="text"
        id={rangeId.toString()}
        label="Плотность"
        value={rangeValue}
        onChange={rangeChangeHandler}
        name={rangeName}
        required
        sx={{ marginBottom: '16px' }}
      />
      <TextField
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        type="number"
        id={valueId.toString()}
        label="Стоимость"
        value={valueValue}
        onChange={valueChangeHandler}
        name={valueName}
        required
        sx={{ marginBottom: '16px' }}
      />
      <Button
        onClick={() => {
          deleteHandler(rangeId);
        }}
        variant="contained"
      >
        <DeleteIcon />
      </Button>
    </Box>
  );
};

export default RangeInputGroup;
