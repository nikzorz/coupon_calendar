import React, {createContext, useContext, useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';

export enum ConfigStatuses {
  UNVERIFIED,
  VERIFYING ,
  AUTHENTICATED,
  UNAUTHENTICATED
}

export enum AudienceFeatures {
  AU="AU",
  US="US"
}

export interface OITFrontendConfig {
  apiUrl: string
  apiVersion: string
  dateFormat: string
  audienceFeature: AudienceFeatures
  timezone: string
}

export interface OITFrontendConfigContext {
  config?: OITFrontendConfig,
  configError?: string
}

const configContext = createContext<OITFrontendConfig>({
  apiUrl: '',
  apiVersion: '',
  dateFormat: '',
  audienceFeature: AudienceFeatures.US,
  timezone: ''
});

export const ProvideConfig: React.FC = ({ children }) => {
  const { config, configError } = useProvideConfig();

  if (configError) {
    return (
      <div>
        Config error: {configError}
      </div>
    )
  }

  // Return the context when it finishes loading
  return config ? (
    <configContext.Provider value={config}>
      {children}
    </configContext.Provider>
  ) : null;
}

export const useConfig = () => {
  return useContext(configContext);
}

export const useProvideConfig = (): OITFrontendConfigContext => {
  const [config, setConfig] = useState<OITFrontendConfig>();
  const [configError, setConfigError] = useState<string>();

  useEffect( () => {

    axios.get<OITFrontendConfig>('/api/v1/config')
      .then((resp) => {
        setConfig(resp.data);
      })
      .catch((error) => {
        setConfigError(error.toString())
      })

  }, []);

  return {
    config,
    configError
  };
}