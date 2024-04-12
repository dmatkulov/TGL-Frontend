// Form mutations
export interface RegisterMutation {
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  password: string;
  phoneNumber: string;
  region: string;
  settlement: string;
  address: string;
}

export interface UserNav {
  id: number;
  name: string;
  navLink: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

// Api responses
export interface RegisterResponse {
  user: User;
}

// Errors & validation messages
export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
