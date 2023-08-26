import { json } from 'react-router-dom';

import ErrorInfoRefresh from '../components/ui/ErrorInfoRefresh';
import getSubmittedData from '../helpers/getSubmittedData';

const profileRoutes = [
  {
    index: true,
    async lazy() {
      const { ProfileIndex } = await import('../pages/Profile/ProfilePanel');
      return { Component: ProfileIndex };
    },
  },
  {
    path: 'account',
    async lazy() {
      const { default: EditAccount } = await import('../pages/Profile/EditAccount');
      return { Component: EditAccount };
    },
    ErrorBoundary: ErrorInfoRefresh,
    async loader() {
      const { getUserWithAllDetails } = await import('../api/users');
      return getUserWithAllDetails();
    },
    async action({ request }) {
      const values = await getSubmittedData(request);

      switch (values._action) {
        case 'updateAdminById': {
          const { default: updateAdminById } = await import('../api/admins');
          return updateAdminById(values);
        }
        case 'updateAddressByAdminId': {
          const { updateAddressByAdminId } = await import('../api/addresses');
          return updateAddressByAdminId(values);
        }
        case 'updateTrainerById': {
          const { default: updateTrainerById } = await import('../api/trainers');
          return updateTrainerById(values);
        }
        case 'updateAddressByTrainerId': {
          const { updateAddressByTrainerId } = await import('../api/addresses');
          return updateAddressByTrainerId(values);
        }
        case 'updateMemberById': {
          const { updateMemberById } = await import('../api/members');
          return updateMemberById(values);
        }
        case 'updateAddressByMemberId': {
          const { updateAddressByMemberId } = await import('../api/addresses');
          return updateAddressByMemberId(values);
        }
        default:
          throw json('Unknown form action', { status: 404 });
      }
    },
  },
];

export default profileRoutes;
