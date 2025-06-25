'use client';

import { createContext } from 'react';

const UserContext = {
  userAuthenticated : {} || null,
  setUserAuth : () => {}
}

const AuthContext = createContext(UserContext)

export {AuthContext};