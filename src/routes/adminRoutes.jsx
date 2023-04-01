import ErrorInfoRefresh from '../components/ErrorInfoRefresh';
import ErrorInfoBack from '../components/ErrorInfoBack';
import RequireAuth from '../components/RequireAuth';

const adminRoutes = [
  {
    index: true,
    async lazy() {
      let { AdminIndex } = await import('../components/Panels/AdminPanel');
      return { Component: AdminIndex };
    },
    ErrorBoundary: ErrorInfoBack,
  },
  {
    path: 'activities',
    async lazy() {
      let { AdminMngActivities } = await import('../components/Panels/AdminMngActivities');
      return { Component: AdminMngActivities };
    },
    ErrorBoundary: ErrorInfoBack,
    async loader() {
      let { getAllActivities } = await import('../services/activities');
      return getAllActivities();
    },
    children: [
      {
        index: true,
        async lazy() {
          let { AdminNewActivity } = await import('../components/Panels/AdminMngActivities');
          return { Component: AdminNewActivity };
        },
        ErrorBoundary: ErrorInfoBack,
      },
      {
        path: 'new',
        ErrorBoundary: ErrorInfoBack,
        async action() {
          let { createActivity } = await import('../services/activities');
          return createActivity();
        },
      },
      {
        path: 'id/:id/edit',
        async lazy() {
          let { AdminEditActivity } = await import('../components/Panels/AdminMngActivities');
          return { Component: AdminEditActivity };
        },
        ErrorBoundary: ErrorInfoRefresh,
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
    ],
  },
  {
    Component: () => <RequireAuth roles={['Admin']} />,
    ErrorBoundary: ErrorInfoBack,
    children: [
      {
        path: 'blogs',
        async lazy() {
          let { AdminMngBlogs } = await import('../components/Panels/AdminMngBlogs');
          return { Component: AdminMngBlogs };
        },
        ErrorBoundary: ErrorInfoBack,
        async loader() {
          let { getAllBlogs } = await import('../services/blogs.js');
          return getAllBlogs();
        },
        children: [
          {
            index: true,
            async lazy() {
              let { AdminNewBlog } = await import('../components/Panels/AdminMngBlogs');
              return { Component: AdminNewBlog };
            },
            ErrorBoundary: ErrorInfoBack,
          },
          {
            path: 'new',
            ErrorBoundary: ErrorInfoBack,
            async action() {
              let { createBlog } = await import('../services/blogs');
              return createBlog();
            },
          },
          {
            path: 'id/:id/edit',
            async lazy() {
              let { AdminEditBlog } = await import('../components/Panels/AdminMngBlogs');
              return { Component: AdminEditBlog };
            },
            ErrorBoundary: ErrorInfoRefresh,
            async loader({ params }) {
              let { getBlogById } = await import('../services/blogs');
              return getBlogById({ params });
            },
            async action({ params, request }) {
              let { updateBlogById } = await import('../services/blogs');
              return updateBlogById({ params, request });
            },
          },
          {
            path: 'id/:id/destroy',
            ErrorBoundary: ErrorInfoBack,
            async action({ params }) {
              let { deleteBlogById } = await import('../services/blogs');
              return deleteBlogById({ params });
            },
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
