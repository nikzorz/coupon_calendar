import React, {createContext, useContext, useEffect} from 'react';
import axios, {AxiosInstance} from "axios";
import {useConfig} from "../config/use-config";

// TODO These names feel terrible but I cannot be bothered to think of something better right now
export enum APIStatuses {
  UNVERIFIED,
  VERIFYING ,
  VALID,
  INVALID
}

export interface CommonAPI {
  apiStatus: APIStatuses
  apiError?: string
}

export interface FormAPI extends CommonAPI {
  submitStatus: APIStatuses
  submitError?: string
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