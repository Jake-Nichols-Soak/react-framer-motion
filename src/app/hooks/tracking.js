import {useEffect} from 'react';

export const useDataLayer = () => {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
  }, []);

  return {
    pushData(event, properties = {}) {
      const payload = {
        event,
        [event]: {
          ...properties
        }
      };

      if (process.env.NODE_ENV === 'development') {
        console.table(payload);
      }

      window.dataLayer.push(payload)
    }
  }
}
