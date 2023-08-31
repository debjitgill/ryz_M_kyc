import { useState, useEffect } from "react";

const useSessionStorage = (key, initialValue) => {
  const storedValue = sessionStorage.getItem(key);
  const [value, setValue] = useState(() =>
    storedValue ? JSON.parse(storedValue) : initialValue
  );

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const handleUpdate = (newValue) => {
    sessionStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, handleUpdate];
};

export default useSessionStorage;
