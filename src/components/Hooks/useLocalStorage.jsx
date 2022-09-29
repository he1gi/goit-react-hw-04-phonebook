import { useState, useEffect } from 'react';

export default function useLocalStorage(
  key,
  value,
  serialize = JSON.stringify,
  deserialize = JSON.parse
) {
  const [state, setState] = useState(
    () => deserialize(window.localStorage.getItem(key)) ?? value
  );

  useEffect(() => {
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize, deserialize]);

  return [state, setState];
}
