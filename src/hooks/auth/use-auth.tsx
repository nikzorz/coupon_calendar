import React, {useState, useContext, createContext, useEffect} from "react";
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {User} from "../../types/user/user";

export interface UseAuthContextType extends CommonAPI {
  authUser?: User
  login(email: string, password: string): void
  logout(): void
  self(): void
}

// TODO find better way to assign type value to context without these defaults
const authContext = createContext<UseAuthContextType>({
  apiStatus: APIStatuses.UNVERIFIED,
  login: () => {},
  logout: () => {},
  self: () => {}
});

export const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();

  // Make API call for "self" immediately
  useEffect(() => {
    auth.self();
  }, []);

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
  const [authUser, setAuthUser] = useState<User>();
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const api = useApi();

  const self = () => {
    api.get<User>('/users/self')
      .then((resp) => {
        setApiStatus(APIStatuses.VALID);
        setAuthUser(resp.data);
      })
      .catch((error) => {
        console.log('Self error: ', error)
        const stringError = error.toString();
        setApiError(stringError);
        setApiStatus(APIStatuses.INVALID);
      })
  }

  const login = (email: string, password: string) => {
    api.post('/auth/login', null,{
      headers: {
        Authorization: `Bearer ${btoa(`${email}:${password}`)}`
      }
    })
      .then(() => {
        self();
      })
      .catch((error) => {
        console.log('Login error: ', error)
        setApiStatus(APIStatuses.INVALID);
        const stringError = error.toString();
        setApiError(stringError);
      })
  }

  const logout = () => {
    api.post('/auth/logout', null)
      .then(() => {
        setAuthUser(undefined);
        setApiStatus(APIStatuses.INVALID);
      })
      .catch((error) => {
        console.log('Logout error: ', error)
        setAuthUser(undefined);
        setApiStatus(APIStatuses.INVALID);
      });
  }

  return {
    apiStatus,
    authUser,
    apiError,
    login,
    logout,
    self
  }
}