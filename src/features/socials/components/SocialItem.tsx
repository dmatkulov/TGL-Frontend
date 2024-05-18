import { Box, CardMedia, Typography } from '@mui/material';
import noLogoImage from '../../../assets/nologo.png';
import { apiURL, appRoutes } from '../../../utils/constants';
import { LoadingButton } from '@mui/lab';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { isDeleteSocialNetwork, isEditing } from '../socialsSlice';
import { deleteSocialNetwork, fetchSocials } from '../socialsThunk';
import { useNavigate } from 'react-router-dom';
import React from 'react';

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
};

const imgBtnBoxStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const SocialItem: React.FC<Props> = ({
  id,
  name,
  link,
  image,
  editHandler,
}) => {
  const isDelete = useAppSelector(isDeleteSocialNetwork);
  const isEdit = useAppSelector(isEditing);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteHandler = async () => {
    await dispatch(deleteSocialNetwork(id));
    await dispatch(fetchSocials());
    navigate(appRoutes.socials);
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
          <Box>
            <LoadingButton
              disabled={isDelete}
              loading={isDelete}
              onClick={deleteHandler}
              sx={{ minWidth: '29px', padding: '3px', borderRadius: '50%' }}
              color="error"
            >
              <CancelIcon />
            </LoadingButton>
            <LoadingButton
              onClick={editHandler}
              disabled={isEdit}
              loading={isEdit}
              variant="contained"
            >
              Изменить
            </LoadingButton>
          </Box>
        </Box>
        <Box>
          <Typography noWrap>{link}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default SocialItem;
