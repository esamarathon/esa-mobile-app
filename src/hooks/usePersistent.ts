import {useState} from 'react';

export function usePersistent<T>(key: string, initialValue?: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item).value : initialValue;
    } catch (error) {
      console.warn('Failed parsing item from local storage', error);

      return initialValue;
    }
  });

  function setValue(value: T) {
    setStoredValue(value);
    if (value === undefined) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify({value}));
    }
  }

  return [storedValue, setValue];
}
