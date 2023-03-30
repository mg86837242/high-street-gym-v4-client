import ErrorInfoRefresh from '../components/ErrorInfoRefresh';
import ErrorInfoBack from '../components/ErrorInfoBack';
import { AdminNewActivity } from '../components/Panels/AdminPanel';

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
      let { getAllActivities } = await import('../services/activities');
      return getAllActivities();
    },
    children: [
      { index: true, Component: AdminNewActivity },
      {
        path: 'id/:id/edit',
        async lazy() {
          let { AdminEditActivity } = await import('../components/Panels/AdminPanel');
          return { Component: AdminEditActivity };
        },
        ErrorBoundary: ErrorInfoBack,
        async loader({ params }) {
          let { getActivityById } = await import('../services/activities');
          return getActivityById({ params });
        },
        async action({ params, request }) {
          let { updateActivityById } = await import('../services/activities');
          return updateActivityById({ params, request });
        },
      },
      {
        path: 'id/:id/destroy',
        ErrorBoundary: ErrorInfoBack,
        async action({ params }) {
          let { deleteActivityById } = await import('../services/activities');
          return deleteActivityById({ params });
        },
      },
      {
        path: 'new',
        ErrorBoundary: ErrorInfoBack,
        async action() {
          let { createActivity } = await import('../services/activities');
          return createActivity() ?? null;
        },
      },
    ],
  },
];

export default adminRoutes;
