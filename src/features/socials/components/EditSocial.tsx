import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useCallback, useEffect} from 'react';
import {appRoutes} from '../../../utils/constants';
import {CircularProgress, Grid} from '@mui/material';
import {isPostLoadingSocials, selectSocial} from '../socialsSlice';
import {fetchOneSocial, updateSocial} from '../socialsThunk';
import {SocialData} from '../../../types/types.SocialsNetwork';
import SocialsForm from '../SocialsForm';

const EditSocial = () => {
  const navigate = useNavigate();
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const social = useAppSelector(selectSocial);
  const isLoading = useAppSelector(isPostLoadingSocials);

  const doFetchOne = useCallback(async() => {
    if(!id) {
      return;
    }
    try {
      await dispatch(fetchOneSocial(id)).unwrap();
    } catch(e) {
      navigate('/404');
    }
  },[dispatch, id, navigate]);

  useEffect(() => {
    void doFetchOne();
  }, [doFetchOne]);

  const onFormSubmit = async (socialMutation: SocialData) => {
    dispatch(updateSocial({
      socialId: id,
      socialMutation,
    }));
    navigate(appRoutes.socials);
  };

  let form = <CircularProgress />;

  if(!isLoading && social) {
    const mutation = {
      ...social,
      name: social.name,
      link: social.link,
      image: null,
    };

    form = <SocialsForm isEdit onSubmit={onFormSubmit} initialSocial={mutation} existingImage={social.image}/>
  }
  return (
    <Grid>
      {form}
    </Grid>
  );
};

export default EditSocial;