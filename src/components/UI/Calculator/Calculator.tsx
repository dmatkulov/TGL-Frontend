import {
  Alert,
  Button,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import box from '..//..//../assets/box.png';

const Calculator = () => {
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });
  const [weight, setWeight] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [result, setResult] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState('');

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIsCalculated(false);

    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setDimensions((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsCalculated(false);

    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setWeight(value);
    }
  };

  const calculateResult = () => {
    if (
      dimensions.length === '' ||
      dimensions.width === '' ||
      dimensions.height === '' ||
      weight === ''
    ) {
      setErrorMessage('Пожалуйста, заполните все поля!');
      return;
    }
    setResult(
      (parseInt(dimensions.length) *
        parseInt(dimensions.width) *
        parseInt(dimensions.height)) /
        6000,
    );
    setIsCalculated(true);
    setErrorMessage('');
  };

  let answer;

  if (isCalculated) {
    if (result > parseInt(weight)) {
      answer = (
        <Typography>
          Груз размером {dimensions.length} * {dimensions.width} *{' '}
          {dimensions.height} (см) и весом {weight}кг будет доставляться по
          объемному весу, равному {result} кг
        </Typography>
      );
    } else {
      answer = (
        <Typography>
          Груз размером {dimensions.length} * {dimensions.width} *{' '}
          {dimensions.height} (см) и весом {weight}кг будет доставляться по
          физическому весу!
        </Typography>
      );
    }
  }

  return (
    <>
      {errorMessage && <Alert>{errorMessage}</Alert>}
      <Typography>
        При отправке легких, но крупногабаритных (объемных) грузов стоимость
        доставки рассчитывается по "объемному весу" в соответствии с формулой:
        <br />
        <b>Длина(см) х Ширина(см) х Высота(см)/6000 = объемный вес(кг)</b>
      </Typography>
      <Grid container justifyContent="start" direction="row">
        <Grid item xs={4} m={5}>
          <Grid item xs={12} m={2}>
            <TextField
              required
              type="number"
              name="length"
              value={dimensions.length}
              label="Длина в см"
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs={12} m={2}>
            <TextField
              required
              name="width"
              type="number"
              value={dimensions.width}
              label="Ширина в см"
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs={12} m={2}>
            <TextField
              required
              type="number"
              name="height"
              value={dimensions.height}
              label="Высота в см"
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs={12} m={2}>
            <TextField
              required
              type="number"
              name="weight"
              value={weight}
              label="Вес в кг"
              onChange={handleWeightChange}
            />
          </Grid>
        </Grid>
        <Grid>
          <CardMedia
            sx={{ width: 300 }}
            component="img"
            alt="Изображение"
            image={box}
          />
        </Grid>
      </Grid>
      <Grid marginLeft={12}>
        <Button variant="contained" color="inherit" onClick={calculateResult}>
          Рассчитать
        </Button>
      </Grid>
      <Grid container marginLeft={7} mt={3} alignItems="center">
        {answer}
      </Grid>
    </>
  );
};

export default Calculator;
