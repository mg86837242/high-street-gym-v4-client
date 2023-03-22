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
      let { getAllLoginEmails } = await import('../services/logins');
      return getAllLoginEmails();
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
