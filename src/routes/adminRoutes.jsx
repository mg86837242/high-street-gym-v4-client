import ErrorInfoRefresh from '../components/ErrorInfoRefresh';

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
    ErrorBoundary: ErrorInfoRefresh,
  },
  {
    path: 'activities',
    async lazy() {
      let { AdminEditActivities } = await import('../components/Panels/AdminPanel');
      return { Component: AdminEditActivities };
    },
    ErrorBoundary: ErrorInfoRefresh,
    async loader() {
      let { getAllActivities } = await import('../services/activities.js');
      return getAllActivities();
    },
  },
];

export default adminRoutes;
