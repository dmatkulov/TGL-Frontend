import {useAppDispatch} from '../../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {appRoutes} from '../../../utils/constants';
import {createSocials} from '../socialsThunk';
import {SocialData} from '../../../types/types.SocialsNetwork';
import SocialsForm from '../SocialsForm';

const NewSocial = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (socialMutation: SocialData) => {
    try {
      await dispatch(createSocials(socialMutation)).unwrap();
      navigate(appRoutes.socials);
    } catch (e) {
      //
    }
  };

  return (
    <>
      <SocialsForm onSubmit={onFormSubmit} />
    </>
  );
};

export default NewSocial;