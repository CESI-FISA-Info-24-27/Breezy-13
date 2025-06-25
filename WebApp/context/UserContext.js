'use client';

import { createContext, useContext, } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = {
  userAuthenticated : {} || null,
  setUserAuthenticated : () => {}
}

const AuthContext = createContext(UserContext)

export {AuthContext};