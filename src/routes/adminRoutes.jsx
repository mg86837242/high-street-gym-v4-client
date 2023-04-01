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
      let { getAllActivities } = await import('../api/activities');
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
          let { createActivity } = await import('../api/activities');
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
          let { getActivityById } = await import('../api/activities');
          return getActivityById({ params });
        },
        async action({ params, request }) {
          let { updateActivityById } = await import('../api/activities');
          return updateActivityById({ params, request });
        },
      },
      {
        path: 'id/:id/destroy',
        ErrorBoundary: ErrorInfoBack,
        async action({ params }) {
          let { deleteActivityById } = await import('../api/activities');
          return deleteActivityById({ params });
        },
      },
    ],
  },
  {
    Component: () => <RequireAuth roles={['Admin']} />,
    children: [
      {
        path: 'blogs',
        async lazy() {
          let { AdminMngBlogs } = await import('../components/Panels/AdminMngBlogs');
          return { Component: AdminMngBlogs };
        },
        ErrorBoundary: ErrorInfoBack,
        async loader() {
          let { getAllBlogs } = await import('../api/blogs.js');
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
              let { createBlog } = await import('../api/blogs');
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
              let { getBlogById } = await import('../api/blogs');
              return getBlogById({ params });
            },
            async action({ params, request }) {
              let { updateBlogById } = await import('../api/blogs');
              return updateBlogById({ params, request });
            },
          },
          {
            path: 'id/:id/destroy',
            ErrorBoundary: ErrorInfoBack,
            async action({ params }) {
              let { deleteBlogById } = await import('../api/blogs');
              return deleteBlogById({ params });
            },
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
