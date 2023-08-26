import { Link } from 'react-router-dom';

import RequireAuth from '../components/layouts/RequireAuth';
import ErrorInfoRefresh from '../components/ui/ErrorInfoRefresh';

const blogsRoutes = [
  {
    index: true,
    async lazy() {
      const { default: List } = await import('../pages/Blogs/List');
      return { Component: List };
    },
    ErrorBoundary: ErrorInfoRefresh,
    async loader() {
      const { getAllBlogs } = await import('../api/blogs');
      return getAllBlogs();
    },
  },
  {
    path: ':id',
    async lazy() {
      const { default: Details } = await import('../pages/Blogs/Details');
      return { Component: Details };
    },
    ErrorBoundary: ErrorInfoRefresh,
    async loader({ params }) {
      const { getBlogById } = await import('../api/blogs');
      return getBlogById({ params });
    },
    handle: {
      crumb: (params, data) => (data?.blog ? <Link to={`/blogs/${params.id}`}>Blog ID: {params.id}</Link> : 'Error'),
    },
    children: [
      {
        index: true,
        async lazy() {
          const { default: DetailsIndex } = await import('../pages/Blogs/DetailsIndex');
          return { Component: DetailsIndex };
        },
        ErrorBoundary: ErrorInfoRefresh,
      },
      {
        Component: () => <RequireAuth permittedRoles={['Admin', 'Trainer', 'Member']} />,
        children: [
          {
            path: 'edit',
            async lazy() {
              const { default: Edit } = await import('../pages/Blogs/Edit');
              return { Component: Edit };
            },
            ErrorBoundary: ErrorInfoRefresh,
            async action({ params, request }) {
              const { updateBlogById } = await import('../api/blogs');
              return updateBlogById({ params, request });
            },
          },
          {
            path: 'destroy',
            ErrorBoundary: ErrorInfoRefresh,
            async action({ params }) {
              const { deleteBlogById } = await import('../api/blogs');
              return deleteBlogById({ params });
            },
          },
        ],
      },
    ],
  },
  {
    Component: () => <RequireAuth permittedRoles={['Admin', 'Trainer', 'Member']} />,
    children: [
      {
        path: 'new',
        ErrorBoundary: ErrorInfoRefresh,
        async action({ request }) {
          const { createBlog } = await import('../api/blogs');
          return createBlog({ request });
        },
        handle: { crumb: () => <Link to='/blogs/new'>New Blog</Link> },
      },
    ],
  },
];

export default blogsRoutes;
