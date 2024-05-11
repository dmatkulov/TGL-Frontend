import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi';
import { serverRoute } from '../../utils/constants';
import { ResponseSocials, SocialData, SocialDataMutation } from '../../types/types.SocialsNetwork';


export const fetchSocials = createAsyncThunk<ResponseSocials | undefined>
('socials/fetchSocials', async () => {
  try {
    const response = await axiosApi.get<ResponseSocials>(serverRoute.socials);
    if (response.data) {
      return response.data;
    }
  } catch (e) {
    console.log('Try to fetch Social Network ', e);
    throw e;
  }
});

export const createSocials = createAsyncThunk<SocialDataMutation, SocialData>(
  'albums/albumCreate',
  async (socialsNetwork) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(socialsNetwork) as (keyof SocialData)[];

      keys.forEach(key => {

        const value = socialsNetwork[key];
        if (value !== null) {
            formData.append(key, value);
          }
      });
      const response = await axiosApi.post(serverRoute.socials, formData);
      return response.data;
    } catch (e) {
      console.log('Try to create new Social Network ', e);
      throw e;
    }
  }
);

export const deleteSocialNetwork = createAsyncThunk<void, string>(
  'socials/deleteSocialNetwork',
  async (id) => {
      const response = await axiosApi.delete(`${serverRoute.socials}/${id}`);
      return response.data;
  },
);