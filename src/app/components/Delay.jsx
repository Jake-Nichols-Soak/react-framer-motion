import React, { useEffect,useState } from 'react';

// eslint-disable-next-line react/prop-types
export const Delay = ({ children, delay }) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setDone(true), delay);
    return () => clearTimeout(showTimer);
  });

  return done && <>{children}</>;
};
