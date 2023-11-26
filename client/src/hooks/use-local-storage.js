import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const prefixedKey = `chat-app-${key}`;
  const [value, setValue] = useState(() => {
    const valueFromLocalStorage = localStorage.getItem(prefixedKey);
    if (
      valueFromLocalStorage != null &&
      valueFromLocalStorage !== "undefined"
    ) {
      return JSON.parse(valueFromLocalStorage);
    }
    if (typeof initialValue === "function") {
      return initialValue();
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);

  return [value, setValue];
};
