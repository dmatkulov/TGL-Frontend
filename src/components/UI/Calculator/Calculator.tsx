import {
  Alert,
  Button,
  CardMedia,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import box from '..//..//../assets/box.png';

const Calculator = () => {
  // const smallScreen = useMediaQuery('(max-width:810px)');
  const extraSmallScreen = useMediaQuery('(max-width:630px)');

  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });

  const [weight, setWeight] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [result, setResult] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [volume, setVolume] = useState<number>(0);
  const [density, setDensity] = useState<number>(0);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIsCalculated(false);

    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setDimensions((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setDimensions((prevState) => ({
        ...prevState,
        [name]: '',
      }));
    }
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsCalculated(false);

    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setWeight(value);
    } else {
      setWeight('');
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
    const length = parseFloat(dimensions.length);
    const width = parseFloat(dimensions.width);
    const height = parseFloat(dimensions.height);
    const parsedWeight = parseFloat(weight);

    const volumeCm3 = length * width * height;
    const volumeM3 = volumeCm3 / 1000000;
    const volumetricWeight = volumeCm3 / 6000;
    const densityResult = parsedWeight / volumeM3;

    setVolume(volumeM3);
    setResult(volumetricWeight);
    setIsCalculated(true);
    setErrorMessage('');
    setDensity(densityResult);
  };

  let answer;

  if (isCalculated) {
    if (result > parseInt(weight)) {
      answer = (
        <Typography>
          Груз размером {dimensions.length} * {dimensions.width} *{' '}
          {dimensions.height} (см) и весом {weight} кг будет доставляться по
          объемному весу, равному {result.toFixed(2)} кг. Объем груза равен{' '}
          {volume.toFixed(2)} м³. Плотность груза равна {density.toFixed(2)}
        </Typography>
      );
    } else {
      answer = (
        <Typography>
          Груз размером {dimensions.length} * {dimensions.width} *{' '}
          {dimensions.height} (см) и весом {weight} кг будет доставляться по
          физическому весу! Объем груза равен {volume.toFixed(2)} м³. Плотность
          груза равна {density.toFixed(2)}
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
        <Grid item xs={extraSmallScreen ? 12 : 4} m={4}>
          <Grid item xs={12} m={2}>
            <TextField
              required
              type="number"
              name="length"
              value={dimensions.length}
              label="Длина в см"
              onChange={inputChangeHandler}
              fullWidth
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
              fullWidth
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
              fullWidth
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
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid>
          <CardMedia
            sx={{ width: 300, display: extraSmallScreen ? 'none' : 'block' }}
            component="img"
            alt="Изображение"
            image={box}
          />
        </Grid>
      </Grid>
      <Grid marginLeft={6}>
        <Button variant="contained" color="inherit" onClick={calculateResult}>
          Рассчитать
        </Button>
      </Grid>
      <Grid container marginLeft={2} mt={3} alignItems="center">
        {answer}
      </Grid>
    </>
  );
};

export default Calculator;
