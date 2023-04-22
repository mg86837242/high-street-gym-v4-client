import { json } from 'react-router-dom';
import ErrorInfoRefresh from '../components/ui/ErrorInfoRefresh';
import getSubmittedData from '../helpers/getSubmittedData';

const profileRoutes = [
  {
    index: true,
    async lazy() {
      let { ProfileIndex } = await import('../pages/Profile/ProfilePanel');
      return { Component: ProfileIndex };
    },
  },
  {
    path: 'account',
    async lazy() {
      let { default: EditAccount } = await import('../pages/Profile/EditAccount');
      return { Component: EditAccount };
    },
    ErrorBoundary: ErrorInfoRefresh,
    async loader() {
      let { getUserWithAllDetails } = await import('../api/users');
      return getUserWithAllDetails();
    },
    async action({ request }) {
      const values = await getSubmittedData(request);

      switch (values._action) {
        case 'updateAdminById':
          let { default: updateAdminById } = await import('../api/admins');
          return updateAdminById(values);
        case 'updateAddressByAdminId':
          let { updateAddressByAdminId } = await import('../api/address');
          return updateAddressByAdminId(values);
        case 'updateTrainerById':
          let { default: updateTrainerById } = await import('../api/trainers');
          return updateTrainerById(values);
        case 'updateAddressByTrainerId':
          let { updateAddressByTrainerId } = await import('../api/address');
          return updateAddressByTrainerId(values);
        case 'updateMemberById':
          let { updateMemberById } = await import('../api/members');
          return updateMemberById(values);
        case 'updateAddressByMemberId':
          let { updateAddressByMemberId } = await import('../api/address');
          return updateAddressByMemberId(values);
        default:
          throw json('Unknown form action', { status: 404 });
      }
    },
  },
];

export default profileRoutes;
