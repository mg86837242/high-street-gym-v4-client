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
    const { role, adminId, trainerId, memberId } = authenticatedUser;
    switch (role) {
      case 'Admin':
        (async () => {
          const response = await get(`${API_URL}/admins/admin-with-all-details-by-id/${adminId}`);
          const json = await response.json();
          if (!ignore) {
            await new Promise((r) => setTimeout(r, 1_500));
            setDefaultValues(json.defaultValues);
          }
        })();
        break;
      case 'Trainer':
        (async () => {
          const response = await get(`${API_URL}/trainers/trainer-with-all-details-by-id/${trainerId}`);
          const json = await response.json();
          if (!ignore) {
            await new Promise((r) => setTimeout(r, 1_500));
            setDefaultValues(json.defaultValues);
          }
        })();
        break;
      case 'Member':
        (async () => {
          const response = await get(`${API_URL}/members/member-with-all-details-by-id/${memberId}`);
          const json = await response.json();
          if (!ignore) {
            await new Promise((r) => setTimeout(r, 1_500));
            setDefaultValues(json.defaultValues);
          }
        })();
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
