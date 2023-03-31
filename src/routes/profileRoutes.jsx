import { json } from 'react-router-dom';
import ErrorInfoRefresh from '../components/ErrorInfoRefresh';

const profileRoutes = [
  {
    index: true,
    async lazy() {
      let { ProfileIndex } = await import('../components/Panels/ProfilePanel');
      return { Component: ProfileIndex };
    },
  },
  {
    path: 'account',
    async lazy() {
      let { default: ProfileEditAccount } = await import('../components/Panels/ProfileEditAccount');
      return { Component: ProfileEditAccount };
    },
    ErrorBoundary: ErrorInfoRefresh,
    async loader() {
      let { getUserWithAllDetailsAndAllEmails } = await import('../services/logins');
      return getUserWithAllDetailsAndAllEmails();
    },
    async action({ request }) {
      const formData = await request.formData();
      const { _action, ...values } = Object.fromEntries(formData);

      switch (_action) {
        case 'updateAdminById':
          let { default: updateAdminById } = await import('../services/admins');
          return updateAdminById(values);
        case 'updateAddressByAdminId':
          let { updateAddressByAdminId } = await import('../services/address');
          return updateAddressByAdminId(values);
        case 'updateTrainerById':
          let { default: updateTrainerById } = await import('../services/trainers');
          return updateTrainerById(values);
        case 'updateAddressByTrainerId':
          let { updateAddressByTrainerId } = await import('../services/address');
          return updateAddressByTrainerId(values);
        case 'updateMemberById':
          let { updateMemberById } = await import('../services/members');
          return updateMemberById(values);
        case 'updateAddressByMemberId':
          let { updateAddressByMemberId } = await import('../services/address');
          return updateAddressByMemberId(values);
        default:
          throw json('Unknown form action', { status: 404 });
      }
    },
  },
];

export default profileRoutes;
