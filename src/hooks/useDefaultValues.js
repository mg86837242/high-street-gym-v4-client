import { useContext, useState, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { API_URL } from '../data/constants';
import get from '../utils/get';

export default function useDefaultValues() {
  const { authenticatedUser } = useContext(AuthContext);
  const [defaultValues, setDefaultValues] = useState(null);
  useEffect(() => {
    if (!authenticatedUser) {
      return undefined;
    }
    let ignore = false;
    switch (authenticatedUser.role) {
      case 'Admin':
        get(`${API_URL}/admins/admin-with-all-details-by-id/${authenticatedUser.adminId}`)
          .then((response) => response.json())
          .then((json) => {
            if (!ignore) {
              setDefaultValues(json.defaultValues);
            }
          });
        break;
      case 'Trainer':
        get(`${API_URL}/trainers/trainer-with-all-details-by-id/${authenticatedUser.trainerId}`)
          .then((response) => response.json())
          .then((json) => {
            if (!ignore) {
              setDefaultValues(json.defaultValues);
            }
          });
        break;
      case 'Member':
        get(`${API_URL}/members/member-with-all-details-by-id/${authenticatedUser.memberId}`)
          .then((response) => response.json())
          .then((json) => {
            if (!ignore) {
              setDefaultValues(json.defaultValues);
            }
          });
        break;
      default:
        break;
    }
    return () => {
      ignore = true;
    };
  }, [authenticatedUser]);
  // PS Logging `defaultValues` fires 4 times: (1 & 2) no `user` state/context, (3 & 4) populated `user` state/context
  return defaultValues;
}
