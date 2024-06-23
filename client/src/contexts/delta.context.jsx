import { createContext, useState } from "react";

export const DeltaContext = createContext({
  delta: {},
  setDelta: () => {},
  updateDelta: () => {},
});

export const DeltaProvider = ({ children }) => {
  const [delta, setDelta] = useState({});

  const updateDelta = (newDelta) => {
    setDelta(newDelta);
  };

  const value = { delta, updateDelta };

  return (
    <DeltaContext.Provider value={value}>{children}</DeltaContext.Provider>
  );
};
