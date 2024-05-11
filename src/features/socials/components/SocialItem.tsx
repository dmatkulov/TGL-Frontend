import { Box, CardMedia, IconButton, Typography } from '@mui/material';
import noLogoImage from '../../../assets/nologo.png';
import { apiURL, appRoutes } from '../../../utils/constants';
import { LoadingButton } from '@mui/lab';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { isDeleteSocialNetwork } from '../socialsSlice';
import { deleteSocialNetwork, fetchSocials } from '../socialsThunk';

import { useNavigate } from 'react-router-dom';

interface Props {
  id: string;
  link: string;
  image: string | null;
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

const SocialItem: React.FC<Props> = ({ id, link, image }) => {
  const isDelete = useAppSelector(isDeleteSocialNetwork);
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
          <Box>
            <LoadingButton
              disabled={isDelete}
              loading={isDelete}
              onClick={deleteHandler}
              sx={{ minWidth: '29px', padding: '3px', borderRadius: '50%' }}
              color="error">
              <IconButton sx={{ color: 'inherit' }}>
                <CancelIcon />
              </IconButton>
            </LoadingButton>
          </Box>
        </Box>
        <Box>
          <Typography>
            {link}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default SocialItem;