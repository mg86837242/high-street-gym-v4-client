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
    path: 'blogs',
    async lazy() {
      let { AdminEditBlogs } = await import('../components/Panels/AdminPanel');
      return { Component: AdminEditBlogs };
    },
  },
  {
    path: 'activities',
    async lazy() {
      let { AdminEditActivities } = await import('../components/Panels/AdminPanel');
      return { Component: AdminEditActivities };
    },
    ErrorBoundary: ErrorInfoBack,
  },
];

export default adminRoutes;
