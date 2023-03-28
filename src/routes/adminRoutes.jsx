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
      let { AdminMngBlogs } = await import('../components/Panels/AdminPanel');
      return { Component: AdminMngBlogs };
    },
    ErrorBoundary: ErrorInfoRefresh,
  },
  {
    path: 'activities',
    async lazy() {
      let { AdminMngActivities } = await import('../components/Panels/AdminPanel');
      return { Component: AdminMngActivities };
    },
    ErrorBoundary: ErrorInfoRefresh,
    async loader() {
      let { getAllActivities } = await import('../services/activities.js');
      return getAllActivities();
    },
    children: [
      {
        path: 'id/:id/edit',
        async lazy() {
          let { AdminEditActivity } = await import('../components/Panels/AdminPanel');
          return { Component: AdminEditActivity };
        },
        async loader({ params }) {
          // Service function getActivityById({params})
          return null;
        },
      },
    ],
  },
];

export default adminRoutes;
