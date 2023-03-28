import ErrorInfoBack from '../components/ErrorInfoBack';

const adminRoutes = [
  {
    index: true,
    async lazy() {
      let { AdminIndex } = await import('../components/Panels/AdminPanel');
      return { Component: AdminIndex };
    },
  },
  {
    path: 'activities',
    async lazy() {
      let { default: AdminEditActivities } = await import('../components/Panels/AdminEditActivities');
      return { Component: AdminEditActivities };
    },
    ErrorBoundary: ErrorInfoBack,
  },
  {
    path: 'blogs',
    async lazy() {
      let { AdminEditBlogs } = await import('../components/Panels/AdminPanel');
      return { Component: AdminEditBlogs };
    },
  },
];

export default adminRoutes;
