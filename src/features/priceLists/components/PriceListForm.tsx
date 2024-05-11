import React, { ChangeEvent, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import {
  CombinedData,
  PriceListName,
  PriceListRangesInputData,
  Range,
} from '../../../types/types.PriceLists';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { isPriceListsUploading } from '../priceListsSlice';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import RangeInputGroup from './RangeInputGroup';
import { uploadPriceList } from '../priceListsThunks';

const PriceListsForm = () => {
  const isUploading = useAppSelector(isPriceListsUploading);
  const dispatch = useAppDispatch();

  const [state, setState] = useState<PriceListName>({
    name: '',
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToTransfer: Range[] = ranges.map((item) => ({
      range: item.rangeValue,
      value: item.valueValue,
    }));

    const combinedData: CombinedData = {
      name: state.name,
      ranges: dataToTransfer,
    };

    dispatch(uploadPriceList(combinedData));
    console.log(combinedData);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const rangeInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRanges((prevState) => {
      const index = prevState.findIndex(
        (item) => item.rangeId === parseInt(id),
      );
      const updatedRanges = [...prevState];
      updatedRanges[index].rangeValue = value;
      return updatedRanges;
    });
  };

  const valueInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRanges((prevState) => {
      const index = prevState.findIndex((item) => item.valueName === name);
      if (index < 0) {
        return prevState;
      }
      const updatedIngredients = [...prevState];
      updatedIngredients[index].valueValue = parseFloat(value);
      return updatedIngredients;
    });
  };

  const addOneHandler = () => {
    setRanges((prevState) => {
      const lastRangeItem = prevState[prevState.length - 1];
      const newRange = {
        rangeId: lastRangeItem.rangeId + 1,
        valueId: lastRangeItem.valueId + 1,
        rangeName: 'range_' + (lastRangeItem.rangeId + 1),
        valueName: 'value_' + (lastRangeItem.valueId + 1),
        rangeValue: '',
        valueValue: lastRangeItem.valueValue + 1,
        rangeChangeHandler: rangeInputChangeHandler,
        valueChangeHandler: valueInputChangeHandler,
        deleteHandler: deleteHandler,
      };
      return [...prevState, newRange];
    });
  };

  const deleteHandler = (rangeId: number) => {
    setRanges((prevState) =>
      prevState.filter((item) => item.rangeId !== rangeId),
    );
  };

  const [ranges, setRanges] = useState<PriceListRangesInputData[]>([
    {
      rangeId: 10,
      rangeName: 'range_10',
      rangeValue: '',
      valueId: 100,
      valueValue: 1,
      valueName: 'value_100',
      rangeChangeHandler: rangeInputChangeHandler,
      valueChangeHandler: valueInputChangeHandler,
      deleteHandler: deleteHandler,
    },
  ]);
  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      onSubmit={submitHandler}
    >
      <Box>
        <TextField
          type="text"
          id="name"
          label="Название"
          value={state.name}
          onChange={inputChangeHandler}
          name="name"
          required
          sx={{ marginBottom: '16px' }}
        />
        <Button
          onClick={addOneHandler}
          variant="contained"
          sx={{ alignSelf: 'center' }}
        >
          <PlusOneIcon />
        </Button>
      </Box>
      <Box>
        {ranges.map((item, i) => (
          <RangeInputGroup
            key={i}
            rangeId={item.rangeId}
            rangeName={item.rangeName}
            rangeValue={item.rangeValue}
            valueId={item.valueId}
            valueName={item.valueName}
            valueValue={item.valueValue}
            rangeChangeHandler={rangeInputChangeHandler}
            valueChangeHandler={valueInputChangeHandler}
            deleteHandler={deleteHandler}
          />
        ))}
      </Box>
      <LoadingButton
        type="submit"
        variant="contained"
        loading={isUploading}
        sx={{ alignSelf: 'center' }}
      >
        Подтвердить
      </LoadingButton>
    </Box>
  );
};

export default PriceListsForm;
