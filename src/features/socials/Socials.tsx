import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSocials } from './socialsSlice';
import { useEffect, useState } from 'react';
import { createSocials, fetchSocials } from './socialsThunk';
import { Box, Button } from '@mui/material';
import SocialItem from './components/SocialItem';
import { NavLink as SocialsFormLink } from 'react-router-dom';
import { appRoutes } from '../../utils/constants';
import SocialModal from './components/SocialModal';
import { SocialData } from '../../types/types.SocialsNetwork';

const historyButtonEffect = {
  marginRight: '30px',
  border: '2px solid white',
  borderRadius: '10px',
  marginBottom: '10px',
};

const Socials = () => {
  const dispatch = useAppDispatch();
  const socials = useAppSelector(selectSocials);
  const [open, setOpen] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [id, setId] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const editHandler = async (id: string) => {
    setOpen(true);
    setEditToggle(true);
    setId(id);
  };

  useEffect(() => {
    dispatch(fetchSocials());
  }, [dispatch]);

  return (
    <>
      <Box>
        <Button
          variant="contained"
          sx={historyButtonEffect}
          onClick={handleClickOpen}
        >
          Добавить социальную сеть
        </Button>
        {socials.map((item) => (
          <SocialItem
            id={item._id}
            key={item._id}
            name={item.name}
            link={item.link}
            image={item.image}
            editHandler={() => editHandler(item._id)}
          />
        ))}
      </Box>

      <SocialModal
        open={open}
        onClose={() => setOpen(false)}
        edit={editToggle}
        setEdit={() => setEditToggle(false)}
        id={id}
      />
    </>
  );
};

export default Socials;
