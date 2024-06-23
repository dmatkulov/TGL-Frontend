import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectPups, selectPupsLoading } from '../pupsSlice';
import { createPup, fetchPups } from '../pupsThunks';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import 'react-phone-input-2/lib/material.css';
import PupItem from './PupItem';
import { PupMutation } from '../../../types/types.Pup';
import { selectUser } from '../../users/usersSlice';
import PupForm from './PupForm';
import CloseIcon from '@mui/icons-material/Close';

const styleBoxSpinner = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '50px',
};

const gridContainer = {
  marginTop: '15px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const PupList: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPupsLoading);
  const pups = useAppSelector(selectPups);
  const user = useAppSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const isExtraSmallScreen = useMediaQuery('(max-width:680px)');
  const isMediumScreen = useMediaQuery('(min-width:680px)');

  useEffect(() => {
    dispatch(fetchPups());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitFormHandler = async (state: PupMutation) => {
    await dispatch(createPup(state)).unwrap();
    await dispatch(fetchPups());
    handleClose();
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let tableContent = <CircularProgress />;

  if (!loading) {
    tableContent = (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ textTransform: 'uppercase' }}>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Номер ПВЗ
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Адрес
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Номер телефона
              </TableCell>
              {user?.role === 'super' && (
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Изменить
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {pups
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <PupItem key={item._id} pupItem={item} />
              ))}
          </TableBody>
        </Table>
        <TablePagination
          labelRowsPerPage="Рядов на таблице"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pups.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    );
  }

  return (
    <>
      <Stack>
        {user?.role === 'super' && (
          <Grid item sx={{ marginBottom: 3 }}>
            <Button variant="contained" onClick={handleClickOpen}>
              Добавить ПВЗ
            </Button>
          </Grid>
        )}
        {loading ? (
          <Box sx={styleBoxSpinner}>
            <CircularProgress size={100} />
          </Box>
        ) : (
          !isExtraSmallScreen && <Grid mt={2}>{tableContent}</Grid>
        )}

        {!isMediumScreen && (
          <>
            <Grid container sx={gridContainer}>
              {pups
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <Grid item xs={12} key={item._id}>
                    <Card sx={{ mt: 2, mb: 2 }}>
                      <CardContent>
                        <Typography
                          sx={{
                            mt: 1,
                            mb: 1,
                            '--Grid-borderWidth': '2px',
                            borderBottom: 'var(--Grid-borderWidth) solid',
                            borderColor: 'divider',
                          }}
                          gutterBottom
                        >
                          <Typography>Номер ПВЗ: {item.name}</Typography>
                        </Typography>
                        <Typography>
                          Адрес ПВЗ:{' '}
                          {item ? (
                            item.address
                          ) : (
                            <span style={{ color: 'red', fontWeight: 700 }}>
                              Нет ПВЗ
                            </span>
                          )}
                        </Typography>
                        <Typography>
                          Номер телефона: {item.phoneNumber}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              <Grid item xs={12}>
                <TablePagination
                  labelRowsPerPage={isExtraSmallScreen && ''}
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={pups.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Grid>
            </Grid>
          </>
        )}
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
          <DialogTitle>
            <Typography>Добавить ПВЗ:</Typography>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ mt: '20px' }}>
            <PupForm onSubmit={submitFormHandler} isCreate />
          </DialogContent>
        </Dialog>
      </Stack>
    </>
  );
};

export default PupList;
