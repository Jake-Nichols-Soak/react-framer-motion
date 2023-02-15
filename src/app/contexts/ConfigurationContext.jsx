import { createContext, useContext, useState } from 'react';
import {get as getDotPath, set as setDotPath} from 'dot-prop';

const ConfigurationContext = createContext();

const ConfigurationProvider = ({ config, children }) => {
  const [configuration, setConfiguration] = useState(config);

  const getConfigValue = (key, fallback = null) => {
    return getDotPath(configuration, key, fallback);
  }

  const setConfigValue = (key, value) => {
    const config = setDotPath(configuration, key, value);

    setConfiguration(config);
  }

  return (
    <ConfigurationContext.Provider value={{configuration, getConfigValue, setConfigValue}}>
      {children}
    </ConfigurationContext.Provider>
  )
}

const useConfig = () => useContext(ConfigurationContext);

export { ConfigurationProvider, useConfig };
