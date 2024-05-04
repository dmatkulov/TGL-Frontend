import { GlobalErrorMessage, ValidationError } from '../../types/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createStaff,
  getStaff,
  getStaffData,
  login,
  loginByLastSession,
  logOut,
  register, update,
} from './usersThunks';
import { RootState } from '../../app/store';
import { Staff, User } from '../../types/types.User';

interface UserState {
  user: User | null;
  lastUser: User | null;
  staffData: Staff[];
  staff: Staff | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalErrorMessage | null;
  logOutLoading: boolean;
  getStaffLoading: boolean;
  getStaffDataLoading: boolean;
}

const initialState: UserState = {
  user: null,
  lastUser: null,
  staffData: [],
  staff: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  logOutLoading: false,
  getStaffLoading: false,
  getStaffDataLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
    setRegisterError: (state, { payload: action }) => {
      state.registerError = action;
    },
    setLoginError: (state, { payload: action }) => {
      state.loginError = action;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, { payload: data }) => {
        state.registerLoading = false;
        state.user = data.user;
        state.lastUser = data.user;
      })
      .addCase(register.rejected, (state, { payload: error }) => {
        state.registerLoading = false;
        state.registerError = error || null;
      });

    builder
      .addCase(createStaff.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(createStaff.fulfilled, (state) => {
        state.registerLoading = false;
      })
      .addCase(createStaff.rejected, (state) => {
        state.registerLoading = false;
      });

    builder
      .addCase(getStaffData.pending, (state) => {
        state.getStaffDataLoading = true;
      })
      .addCase(getStaffData.fulfilled, (state, { payload }) => {
        state.getStaffDataLoading = false;
        if (payload) {
          state.staffData = payload.users;
        }
      })
      .addCase(getStaffData.rejected, (state) => {
        state.getStaffDataLoading = false;
      });

    builder
      .addCase(update.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      });
    builder
      .addCase(update.fulfilled, (state, {payload: updatedUser}) => {
        state.registerLoading = false;
        state.user = updatedUser.user;
      });
    builder
      .addCase(update.rejected, (state, {payload: error}) => {
        state.registerLoading = false;
        state.registerError = error || null;
      })

    builder
      .addCase(getStaff.pending, (state) => {
        state.getStaffLoading = true;
      })
      .addCase(getStaff.fulfilled, (state, { payload }) => {
        state.getStaffLoading = false;
        if (payload) {
          state.staff = payload.user;
        }
      })
      .addCase(getStaff.rejected, (state) => {
        state.getStaffLoading = false;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, { payload: data }) => {
        state.loginLoading = false;
        state.user = data.user;
        state.lastUser = data.user;
      })
      .addCase(login.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });

    builder
      .addCase(loginByLastSession.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginByLastSession.fulfilled, (state, { payload: data }) => {
        state.loginLoading = false;
        state.user = data.user;
        state.lastUser = data.user;
      })
      .addCase(loginByLastSession.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });

    builder
      .addCase(logOut.pending, (state) => {
        state.logOutLoading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.logOutLoading = false;
      })
      .addCase(logOut.rejected, (state) => {
        state.logOutLoading = false;
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectLastUser = (state: RootState) => state.users.lastUser;
export const selectStaff = (state: RootState) => state.users.staff;
export const selectStaffData = (state: RootState) => state.users.staffData;
export const selectRegisterLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectRegisterError = (state: RootState) =>
  state.users.registerError;
export const selectLoginLoading = (state: RootState) =>
  state.users.loginLoading;
export const selectGetStaffLoading = (state: RootState) =>
  state.users.getStaffLoading;
export const selectGetStaffDataLoading = (state: RootState) =>
  state.users.getStaffDataLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectLogOutLoading = (state: RootState) =>
  state.users.logOutLoading;
export const { unsetUser, setRegisterError, setLoginError } =
  usersSlice.actions;
