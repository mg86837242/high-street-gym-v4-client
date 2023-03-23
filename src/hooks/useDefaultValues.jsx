import { useState, useEffect } from 'react';

export default function useDefaultValues(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (url) {
      let ignore = false;
      fetch(url, { credentials: 'include' })
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            setData(json.defaultValues);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [url]);
  return data;
}
