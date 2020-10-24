import React, {createContext, useContext, useEffect} from 'react';
import axios, {AxiosInstance} from "axios";
import {useConfig} from "../config/use-config";

export interface CommonAPI {
  apiStatus: APIStatuses
  apiError?: string
}

export enum APIStatuses {
  UNVERIFIED,
  VERIFYING ,
  VALID,
  INVALID
}

const apiContext = createContext<AxiosInstance>({} as AxiosInstance);

export const ProvideAPI: React.FC = ({ children }) => {
  const api = useProvideApi();

  return (
    <apiContext.Provider value={api}>
      {children}
    </apiContext.Provider>
  )
}

export const useApi = () => {
  return useContext(apiContext);
}

export const useProvideApi = (): AxiosInstance => {
  const config = useConfig();

  return axios.create({
    baseURL: `${config.apiUrl}/${config.apiVersion}`
  });
}