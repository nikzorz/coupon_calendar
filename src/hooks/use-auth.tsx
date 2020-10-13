import React, { useState, useContext, createContext } from "react";

export enum AuthStatuses {
  UNVERIFIED,
  VERIFYING ,
  AUTHENTICATED,
  UNAUTHENTICATED
}

export interface AuthUser {
  userId?: number,
  email: string,
}

export interface UseAuthContextType {
  authStatus: AuthStatuses
  authUser?: AuthUser
  login(email: string, password: string): void
  logout(): void
}

// TODO find better way to assign type value to context without these defaults
const authContext = createContext<UseAuthContextType>({
  authStatus: AuthStatuses.UNVERIFIED,
  login: () => {},
  logout: () => {}
});

export const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
}

export const useProvideAuth = ():UseAuthContextType => {
  const [authUser, setAuthUser] = useState<AuthUser>();
  const [authStatus, setAuthStatus] = useState<AuthStatuses>(AuthStatuses.UNVERIFIED);

  const login = (email: string, password: string) => {
    const demoUser = {
      userId: 757,
      email: 'nik@tmsw.com'
    }
    setAuthUser(demoUser)
    setAuthStatus(AuthStatuses.AUTHENTICATED)
  }

  const logout = () => {
    setAuthUser(undefined)
    setAuthStatus(AuthStatuses.UNAUTHENTICATED)
  }

  return {
    authUser,
    authStatus,
    login,
    logout
  }
}