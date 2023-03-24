import ErrorInfo from '../components/ErrorInfo';

const profileRoutes = [
  {
    index: true,
    async lazy() {
      let { ProfileEditIndex } = await import('../components/AuthUI/ProfilePanel');
      return { Component: ProfileEditIndex };
    },
  },
  {
    path: 'account',
    async lazy() {
      let { ProfileEditAccount } = await import('../components/AuthUI/ProfilePanel');
      return { Component: ProfileEditAccount };
    },
    async loader() {
      let { default: getAllLoginEmails } = await import('../services/logins');
      return getAllLoginEmails();
    },
    async action({ request }) {
      let formData = await request.formData();
      let { _action, ...values } = Object.fromEntries(formData);

      if (_action === 'updateAdminById') {
        let { default: updateAdminById } = await import('../services/admins');
        return updateAdminById(values);
      }
      if (_action === 'updateAddressByAdminId') {
        let { updateAddressByAdminId } = await import('../services/address');
        return updateAddressByAdminId(values);
      }
      if (_action === 'updateTrainerById') {
        let { default: updateTrainerById } = await import('../services/trainers');
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
    ErrorBoundary: ErrorInfo,
  },
  {
    path: 'blog',
    async lazy() {
      let { ProfileEditBlog } = await import('../components/AuthUI/ProfilePanel');
      return { Component: ProfileEditBlog };
    },
    ErrorBoundary: ErrorInfo,
  },
];

export default profileRoutes;
