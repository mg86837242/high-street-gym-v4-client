import ErrorInfoBack from '../components/ErrorInfoBack';
import ErrorInfoRefresh from '../components/ErrorInfoRefresh';

const profileRoutes = [
  {
    index: true,
    async lazy() {
      let { ProfileEditIndex } = await import('../components/AuthPanels/ProfilePanel');
      return { Component: ProfileEditIndex };
    },
  },
  {
    path: 'account',
    async lazy() {
      let { default: ProfileEditAccount } = await import('../components/AuthPanels/ProfileEditAccount');
      return { Component: ProfileEditAccount };
    },
    ErrorBoundary: ErrorInfoRefresh,
    async loader() {
      let { default: getAllLoginEmails } = await import('../services/logins');
      return getAllLoginEmails();
    },
    async action({ request }) {
      let formData = await request.formData();
      let { _action, ...values } = Object.fromEntries(formData);

      if (_action === 'updateAdminById') {
        let { updateAdminById } = await import('../services/admins');
        return updateAdminById(values);
      }
      if (_action === 'updateAddressByAdminId') {
        let { updateAddressByAdminId } = await import('../services/address');
        return updateAddressByAdminId(values);
      }
      if (_action === 'updateTrainerById') {
        let { updateTrainerById } = await import('../services/trainers');
        return updateTrainerById(values);
      }
      if (_action === 'updateAddressByTrainerId') {
        let { updateAddressByTrainerId } = await import('../services/address');
        return updateAddressByTrainerId(values);
      }
      if (_action === 'updateMemberById') {
        let { updateMemberById } = await import('../services/members');
        return updateMemberById(values);
      }
      if (_action === 'updateAddressByMemberId') {
        let { updateAddressByMemberId } = await import('../services/address');
        return updateAddressByMemberId(values);
      }
      return;
    },
  },
  {
    path: 'blog',
    async lazy() {
      let { ProfileEditBlog } = await import('../components/AuthPanels/ProfilePanel');
      return { Component: ProfileEditBlog };
    },
    ErrorBoundary: ErrorInfoBack,
  },
];

export default profileRoutes;
