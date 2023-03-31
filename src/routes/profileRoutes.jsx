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

      // TODO Refactor by using switch
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
  },
];

export default profileRoutes;
