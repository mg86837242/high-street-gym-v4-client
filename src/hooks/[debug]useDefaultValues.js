import { useContext, useState, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { getAdminWithAllDetailsById } from '../services/admins';
import { getTrainerWithAllDetailsById } from '../services/trainers';
import { getMemberWithAllDetailsById } from '../services/members';
import { API_URL } from '../data/constants';

export default function useDefaultValues() {
  const { authenticatedUser } = useContext(AuthContext);
  const [defaultValues, setDefaultValues] = useState(null);
  // FIX How to cleanup or why is this Effect fires 8 times after submitting form (for example to update admin by id)  => Theory: (1) revalidation causes the user context (the dependency) and subsequently the default values to update, causing this Effect to run twice, (2) the Effect syncing with `actionData` causes this Effect to run twice, proved by disabling that Effect, (3) updating this source code will cause Effect to run 4 times, (4) bear in mind that I'm using controlled input for managing the initial value for email, but uncontrolled for managing the input values other inputs/selects (this makes me want to change everything to controlled and to see what would happened?)
  useEffect(() => {
    let controller = new AbortController();
    if (!authenticatedUser) {
      return undefined;
    }
    if (authenticatedUser?.role === 'Admin') {
      (async () => {
        try {
          const response = await fetch(`${API_URL}/admins/admin-with-all-details-by-id/${authenticatedUser.adminId}`, {
            credentials: 'include',
            signal: controller.signal,
          });
          const json = await response.json();
          setDefaultValues(json.defaultValues);
          controller = null;
        } catch (error) {
          console.log(error);
          return undefined;
        }
      })();
    } else {
      return undefined;
    }

    return () => controller?.abort();
  }, [authenticatedUser]);
  // PS Logging `defaultValues` fires 4 times when the component is first mounted: (1 & 2) no `user` state/context,
  //  (3 & 4) populated `user` state/context
  // console.log(`🟢 [${new Date().toLocaleTimeString()}] : `, defaultValues);
  return defaultValues;
}
