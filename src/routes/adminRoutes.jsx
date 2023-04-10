import ErrorInfoRefresh from '../components/ui/ErrorInfoRefresh';
import ErrorInfoBack from '../components/ui/ErrorInfoBack';
import RequireAuth from '../components/layouts/RequireAuth';
import { redirect } from 'react-router-dom';

const adminRoutes = [
  {
    index: true,
    async lazy() {
      let { AdminIndex } = await import('../pages/Admin/AdminPanel');
      return { Component: AdminIndex };
    },
    ErrorBoundary: ErrorInfoBack,
  },
  {
    path: 'activities',
    async lazy() {
      let { MngActivities } = await import('../pages/Admin/MngActivities');
      return { Component: MngActivities };
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
          let { NewActivity } = await import('../pages/Admin/MngActivities');
          return { Component: NewActivity };
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
        path: 'new-xml',
        ErrorBoundary: ErrorInfoBack,
        async action({ request }) {
          let { createActivityXML } = await import('../api/activities');
          return createActivityXML({ request });
        },
      },
      {
        path: ':id/edit',
        async lazy() {
          let { EditActivity } = await import('../pages/Admin/MngActivities');
          return { Component: EditActivity };
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
        path: ':id/destroy',
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
          let { MngBlogs } = await import('../pages/Admin/MngBlogs');
          return { Component: MngBlogs };
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
              let { NewBlog } = await import('../pages/Admin/MngBlogs');
              return { Component: NewBlog };
            },
            ErrorBoundary: ErrorInfoBack,
          },
          {
            path: 'new',
            ErrorBoundary: ErrorInfoBack,
            async action({ request }) {
              let { createBlog } = await import('../api/blogs');
              return createBlog({ request });
            },
          },
          {
            path: ':id/edit',
            async lazy() {
              let { EditBlog } = await import('../pages/Admin/MngBlogs');
              return { Component: EditBlog };
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
            path: ':id/destroy',
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
