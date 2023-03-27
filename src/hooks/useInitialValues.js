import { useContext, useState, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { getAdminWithAllDetailsById } from '../services/admins';
import { getTrainerWithAllDetailsById } from '../services/trainers';
import { getMemberWithAllDetailsById } from '../services/members';

export default function useInitialValues() {
  const { authenticatedUser } = useContext(AuthContext);

  // Why is this Effect fires 8 times after submitting form (for example to update admin by id)  => Theory: (1) revalidation causes the user context (the dependency) and subsequently the default values to update, causing this Effect to run twice, (2) the Effect syncing with `actionData` for revalidation purposes causes this Effect to run twice, proved by disabling that Effect, (3) updating this source code or idling for some time before tab-switching to browser will cause Effect to run 4 times, (4) bear in mind that I'm using controlled input for managing the initial value for email, but uncontrolled for managing the input values other inputs/selects, elements are halted to render before `initialValues` loaded, o/w controlled inputs can't be updated due to the fact that they can only be updated thru setter, not subscribing to the change of `initialValues`
  useEffect(() => {
    return () => {
      ignore = true;
    };
  }, [authenticatedUser]);
  // PS Logging `initialValues` fires 4 times when the component is first mounted: (1 & 2) no `user` state/context,
  //  (3 & 4) populated `user` state/context
  // console.log(`🟢 [${new Date().toLocaleTimeString()}] : `, initialValues);
  return initialValues;
}
