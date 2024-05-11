import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSocials } from './socialsSlice';
import { useEffect } from 'react';
import { fetchSocials } from './socialsThunk';
import { Box, Button } from '@mui/material';
import SocialItem from './components/SocialItem';

import { NavLink as SocialsFormLink } from 'react-router-dom';
import { appRoutes } from '../../utils/constants';

const historyButtonEffect = {
  marginRight: "30px",
  border: "2px solid white",
  borderRadius: "10px",
  marginBottom: '10px',
};

const Socials = () => {
  const dispatch = useAppDispatch();
  const socials = useAppSelector(selectSocials);
  console.log(socials)

  useEffect(() => {
    dispatch(fetchSocials());
  }, [dispatch]);

  return (
   <>
     <Box>
       <Button component={SocialsFormLink}
               variant="contained"
               to={appRoutes.socialsForm}
               sx={historyButtonEffect}>
         Добавить социальную сеть
       </Button>
       {socials.map((item) => (
         <SocialItem
           id={item._id}
           key={item._id}
           link={item.link}
           image={item.image}
         />
       ))}
     </Box>
   </>
  );
};

export default Socials;
