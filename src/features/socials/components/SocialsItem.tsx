import { Box, CardMedia, Typography } from '@mui/material';
import noLogoImage from '../../../assets/nologo.png';
import { apiURL } from '../../../utils/constants';
import { LoadingButton } from '@mui/lab';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteSocialNetwork, fetchSocials } from '../socialsThunk';
import React from 'react';
import { selectUser } from '../../users/usersSlice';

interface Props {
  id: string;
  name: string;
  link: string;
  image: string | null;
  editHandler: () => void;
}

const outerBoxStyle = {
  border: '2px solid grey',
  borderRadius: '10px',
  padding: '10px',
  marginBottom: '10px',
  overflow: 'hidden',
};

const imgBtnBoxStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const SocialsItem: React.FC<Props> = ({
  id,
  name,
  link,
  image,
  editHandler,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const deleteHandler = async () => {
    await dispatch(deleteSocialNetwork(id));
    await dispatch(fetchSocials());
  };

  let coverImage = noLogoImage;

  if (image) {
    coverImage = apiURL + '/' + image;
  }

  return (
    <>
      <Box id={id} key={id} sx={outerBoxStyle}>
        <Box sx={imgBtnBoxStyle}>
          <CardMedia
            component="img"
            sx={{ width: 50, borderRadius: '10px' }}
            image={coverImage}
            alt={link}
          />
          <Typography>{name}</Typography>
          {user && (user.role === 'super') && (
            <Box>
              <LoadingButton
                onClick={deleteHandler}
                sx={{ minWidth: '29px', padding: '3px', borderRadius: '50%' }}
                color="error"
              >
                <CancelIcon />
              </LoadingButton>
              <LoadingButton onClick={editHandler} variant="contained">
                Изменить
              </LoadingButton>
            </Box>
          )}
        </Box>
        <Box>
          <Typography noWrap>{link}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default SocialsItem;
