import { useContext, useState, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { API_URL } from '../data/constants';

export default function useDefaultValues() {
  const { authenticatedUser } = useContext(AuthContext);
  const [defaultValues, setDefaultValues] = useState(null);
  useEffect(() => {
    if (!authenticatedUser) {
      return;
    }
    let ignore = false;
    switch (authenticatedUser.role) {
      case 'Admin ':
        fetch(`${API_URL}/admins/admin-with-all-details-by-id/${authenticatedUser.adminId}`, {
          credentials: 'include',
        })
          .then((response) => response.json())
          .then((json) => {
            if (!ignore) {
              setDefaultValues(json.defaultValues);
            }
          });
        break;
      case 'Member':
        fetch(`${API_URL}/members/member-with-all-details-by-id/${authenticatedUser.memberId}`, {
          credentials: 'include',
        })
          .then((response) => response.json())
          .then((json) => {
            if (!ignore) {
              setDefaultValues(json.defaultValues);
            }
          });
        break;
      default:
        return;
    }
    return () => {
      ignore = true;
    };
  }, [authenticatedUser]);
  // PS Logging `defaultValues` fires 4 times: (1 & 2) no `user` state/context, (3 & 4) populated `user` state/context
  return defaultValues;
}
