import { GlobalErrorMessage, ValidationError } from '../../types/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createStaff,
  fetchClients,
  fetchSingleClient,
  getEmployee,
  getOneUser,
  getStaff,
  getStaffData,
  login,
  loginByLastSession,
  logout,
  register,
  update,
} from './usersThunks';
import { RootState } from '../../app/store';
import { Client, Staff, User } from '../../types/types.User';

interface UserState {
  user: User | null;
  lastUser: User | null;
  oneUser?: User | null;
  staffData: Staff[];
  clients: Client[];
  client: Client | null;
  staff: Staff | null;
  employee: Staff | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalErrorMessage | null;
  logOutLoading: boolean;
  getStaffLoading: boolean;
  getStaffDataLoading: boolean;
  getOneUserLoading: boolean;
  isClientsLoading: boolean;
  isSingleClientLoading: boolean;
  isClientDeleting: boolean;
  isEmployedLoading: boolean;
}

const initialState: UserState = {
  user: null,
  lastUser: null,
  oneUser: null,
  staffData: [],
  clients: [],
  client: null,
  staff: null,
  employee: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  logOutLoading: false,
  getStaffLoading: false,
  getOneUserLoading: false,
  getStaffDataLoading: false,
  isClientsLoading: false,
  isSingleClientLoading: false,
  isClientDeleting: false,
  isEmployedLoading: false,
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
    clearEmployee: (state) => {
      state.employee = null;
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

    builder.addCase(update.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(update.fulfilled, (state, { payload: updatedUser }) => {
      state.registerLoading = false;
      state.user = updatedUser.user;
    });
    builder.addCase(update.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

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
      .addCase(getOneUser.pending, (state) => {
        state.getOneUserLoading = true;
      })
      .addCase(getOneUser.fulfilled, (state, { payload }) => {
        state.getOneUserLoading = false;
        if (payload) {
          state.oneUser = payload.user;
        }
      })
      .addCase(getOneUser.rejected, (state) => {
        state.getOneUserLoading = false;
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
      .addCase(logout.pending, (state) => {
        state.logOutLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logOutLoading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.logOutLoading = false;
      });
    builder
      .addCase(fetchClients.pending, (state) => {
        state.isClientsLoading = true;
      })
      .addCase(fetchClients.fulfilled, (state, { payload }) => {
        if (payload) {
          state.clients = payload.clients;
        }
        state.isClientsLoading = false;
      })
      .addCase(fetchClients.rejected, (state) => {
        state.isClientsLoading = false;
      });
    builder
      .addCase(fetchSingleClient.pending, (state) => {
        state.isSingleClientLoading = true;
      })
      .addCase(fetchSingleClient.fulfilled, (state, { payload }) => {
        if (payload) {
          state.client = payload.client;
        }
        state.isSingleClientLoading = false;
      })
      .addCase(fetchSingleClient.rejected, (state) => {
        state.isSingleClientLoading = false;
      });

    builder
      .addCase(getEmployee.pending, (state) => {
        state.isEmployedLoading = true;
      })
      .addCase(getEmployee.fulfilled, (state, { payload }) => {
        state.isEmployedLoading = false;
        if (payload) {
          state.employee = payload.user;
        }
      })
      .addCase(getEmployee.rejected, (state) => {
        state.isEmployedLoading = false;
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectOneUser = (state: RootState) => state.users.oneUser;
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
export const selectGetOneUserLoading = (state: RootState) =>
  state.users.getOneUserLoading;
export const selectGetStaffDataLoading = (state: RootState) =>
  state.users.getStaffDataLoading;
export const selectEmployee = (state: RootState) => state.users.employee;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectLogOutLoading = (state: RootState) =>
  state.users.logOutLoading;
export const { unsetUser, setRegisterError, setLoginError, clearEmployee } =
  usersSlice.actions;
export const clientsState = (state: RootState) => state.users.clients;
export const singleClientState = (state: RootState) => state.users.client;
export const isClientsLoading = (state: RootState) =>
  state.users.isClientsLoading;
export const isSingleClientLoading = (state: RootState) =>
  state.users.isClientsLoading;
export const isClientDeleting = (state: RootState) =>
  state.users.isClientsLoading;
