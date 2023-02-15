import {useConfig} from '@/app/contexts/ConfigurationContext';

export const useImagePath = () => {
  const { getConfigValue } = useConfig();

  return (src) => `${getConfigValue('imagePath')}/${src.replace(/^\/+/, '')}`;
};

export const useDataPath = () => {
  const { getConfigValue } = useConfig();

  return (src) => `${getConfigValue('dataPath')}/${src.replace(/^\/+/, '')}`;
};
