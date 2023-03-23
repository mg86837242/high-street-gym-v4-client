import { useContext, useState, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { API_URL } from '../data/constants';

export default function useDefaultValues() {
  const { authenticatedUser } = useContext(AuthContext);
  const [defaultValues, setDefaultValues] = useState(null);
  useEffect(() => {
    if (authenticatedUser) {
      let ignore = false;
      if (authenticatedUser.role === 'Member') {
        fetch(`${API_URL}/members/member-with-details-by-id/${authenticatedUser.memberId}`, { credentials: 'include' })
          .then((response) => response.json())
          .then((json) => {
            if (!ignore) {
              setDefaultValues(json.defaultValues);
            }
          });
      }
      return () => {
        ignore = true;
      };
    }
  }, [authenticatedUser]);
  return defaultValues;
}
