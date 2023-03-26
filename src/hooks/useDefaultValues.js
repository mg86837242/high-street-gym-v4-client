import { useContext, useState, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { getAdminWithAllDetailsById } from '../services/admins';
import { getTrainerWithAllDetailsById } from '../services/trainers';
import { getMemberWithAllDetailsById } from '../services/members';

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
          const json = await getAdminWithAllDetailsById(adminId);
          if (!ignore) {
            // await new Promise((r) => setTimeout(r, 5_000));
            setDefaultValues(json.defaultValues);
          }
        })();
        break;
      case 'Trainer':
        (async () => {
          const json = await getTrainerWithAllDetailsById(trainerId);
          if (!ignore) {
            setDefaultValues(json.defaultValues);
          }
        })();
        break;
      case 'Member':
        (async () => {
          const json = await getMemberWithAllDetailsById(memberId);
          if (!ignore) {
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
