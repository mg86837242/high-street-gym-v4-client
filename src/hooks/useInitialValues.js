import { useContext, useState, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { getAdminWithAllDetailsById } from '../services/admins';
import { getTrainerWithAllDetailsById } from '../services/trainers';
import { getMemberWithAllDetailsById } from '../services/members';

export default function useInitialValues() {
  const { authenticatedUser } = useContext(AuthContext);
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    return () => {
      ignore = true;
    };
  }, [authenticatedUser]);

  return initialValues;
}
