import {
  Alert,
  Button,
  CardMedia,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import box from '..//..//../assets/box.png';

const Calculator = () => {
  const smallScreen = useMediaQuery('(max-width:810px)');
  const extraSmallScreen = useMediaQuery('(max-width:630px)');

  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });

  const [priceCalculate, setPriceCalculate] = useState({
    weight: '',
    price: '',
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

  const inputChangeResult = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPriceCalculate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  let getPrice;

  const calculatePrice = () => {
    return parseInt(priceCalculate.weight) * parseInt(priceCalculate.price);
  };

  if (calculatePrice() > 0) {
    getPrice = <Typography>Общая стоимость {calculatePrice()}$</Typography>;
  }

  const createData = (name: string, express: string, standard: string) => {
    return { name, express, standard };
  };

  const householdGoods = [
    createData('Скорость', '7-13 дней', '12-18 дней'),
    createData('Плотность', '$/KG(цена за 1кг)', '$/KG(цена за 1кг)'),
    createData('1000-9999', '2', '1.9'),
    createData('800-1000', '2.1', '2'),
    createData('600-800', '2.2', '2.1'),
    createData('500-600', '2.3', '2.2'),
    createData('400-500', '2.3', '2.3'),
    createData('350-400', '2.4', '2.4'),
    createData('300-350', '2.5', '2.5'),
    createData('250-300', '2.6', '2.6'),
    createData('200-250', '2.7', '2.7'),
    createData('190-200', '2.8', '2.8'),
    createData('180-190', '2.9', '2.9'),
    createData('170-180', '3', '3'),
    createData('160-170', '3.1', '3.1'),
    createData('150-160', '3.2', '3.2'),
    createData('140-150', '3.3', '3.3'),
    createData('130-140', '3.4', '3.4'),
    createData('120-130', '3.5', '3.5'),
    createData('110-120', '3.6', '3.6'),
    createData('80-110', '3.7', '3.7'),
    createData('0-80', '370 (за 1 м³)', '330 (за 1 м³'),
  ];

  const cloth = [
    createData('Скорость', '7-13 дней', '12-18 дней'),
    createData('Плотность', '$/KG(цена за 1кг)', '$/KG(цена за 1кг)'),
    createData('400-5000', '4.2', '3'),
    createData('350-400', '4.1', '3.1'),
    createData('300-350', '4', '3.2'),
    createData('250-300', '3.7', '3.4'),
    createData('200-250', '3.8', '3.6'),
    createData('200-240', '3.8', '3.6'),
    createData('190-200', '3.9', '3.7'),
    createData('180-190', '4', '3.8'),
    createData('170-180', '4.1', '3.9'),
    createData('170-180', '4.1', '3.9'),
    createData('160-170', '4.2', '4'),
    createData('150-160', '4.3', '4.1'),
    createData('140-150', '4.3', '4.2'),
    createData('130-140', '4.4', '4.3'),
    createData('120-130', '4.5', '4.4'),
    createData('100-120', '4.6', '4.5'),
    createData('80-110', '4.7', '4.6'),
    createData('0-80', '400 (за 1 м³)', '390 (за 1 м³)'),
  ];

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
        <Grid item xs={extraSmallScreen ? 12 : 4} m={5}>
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
      <Grid marginLeft={12}>
        <Button variant="contained" color="inherit" onClick={calculateResult}>
          Рассчитать
        </Button>
      </Grid>
      <Grid container marginLeft={2} mt={3} alignItems="center">
        {answer}
      </Grid>

      <Grid item xs={4} m={5}>
        <Typography variant="h6">Введите масса(кг) и цену за 1 кг</Typography>
        <Grid item xs={12} m={2}>
          <TextField
            required
            type="number"
            name="weight"
            value={priceCalculate.weight}
            label="Вес (кг)"
            onChange={inputChangeResult}
          />
        </Grid>
        <Grid item xs={12} m={2}>
          <TextField
            required
            type="number"
            name="price"
            value={priceCalculate.price}
            label="цена за кг"
            onChange={inputChangeResult}
          />
        </Grid>
        {getPrice}
      </Grid>

      <Grid container spacing={3} mt={3}>
        <Grid item xs={smallScreen ? 12 : 6}>
          <TableContainer component={Paper}>
            <Typography variant="h6">Хозтовар</Typography>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Маршрут</TableCell>
                  <TableCell align="right">Экспресс</TableCell>
                  <TableCell align="right">Стандарт Авто</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {householdGoods.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.express}</TableCell>
                    <TableCell align="right">{row.standard}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={smallScreen ? 12 : 6}>
          <TableContainer component={Paper}>
            <Typography variant="h6">Одежда</Typography>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Маршрут</TableCell>
                  <TableCell align="right">Экспресс</TableCell>
                  <TableCell align="right">Стандарт Авто</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cloth.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.express}</TableCell>
                    <TableCell align="right">{row.standard}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default Calculator;
