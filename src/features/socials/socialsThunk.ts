import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi';
import { serverRoute } from '../../utils/constants';
import {
  ResponseSocials,
  SocialData,
  Social,
  UpdateSocialArg,
} from '../../types/types.SocialsNetwork';

export const fetchSocials = createAsyncThunk<ResponseSocials | undefined>(
  'socials/fetchSocials',
  async () => {
    try {
      const response = await axiosApi.get<ResponseSocials>(serverRoute.socials);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      console.log('Try to fetch Social Network ', e);
      throw e;
    }
  },
);

export const fetchOneSocial = createAsyncThunk<Social, string>(
  'socials/fetchOne',
  async (id) => {
    const response = await axiosApi.get(`${serverRoute.socials}/${id}`);
    return response.data;
  },
);

export const addSocial = createAsyncThunk<null, SocialData>(
  'albums/albumCreate',
  async (socialsNetwork) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(socialsNetwork) as (keyof SocialData)[];

      keys.forEach((key) => {
        const value = socialsNetwork[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });
      const response = await axiosApi.post(serverRoute.socials, formData);
      return response.data;
    } catch (e) {
      console.log('Caught on try - ADD SOCIAL - ', e);
      throw e;
    }
  },
);

export const updateSocial = createAsyncThunk<void, UpdateSocialArg>(
  'socials/update',
  async ({ socialId, socialMutation }) => {
    const formData = new FormData();
    const keys = Object.keys(socialMutation) as (keyof SocialData)[];
    keys.forEach((key) => {
      const value = socialMutation[key];

      if (value) {
        formData.append(key, value);
      }
    });
    return axiosApi.patch(`${serverRoute.socials}/${socialId}`, formData);
  },
);

export const deleteSocialNetwork = createAsyncThunk<void, string>(
  'socials/deleteSocialNetwork',
  async (id) => {
    const response = await axiosApi.delete(`${serverRoute.socials}/${id}`);
    return response.data;
  },
);
