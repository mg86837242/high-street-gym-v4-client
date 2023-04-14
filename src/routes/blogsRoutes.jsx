import { Link } from 'react-router-dom';
import ErrorInfoBack from '../components/ui/ErrorInfoBack';
import RequireAuth from '../components/layouts/RequireAuth';

const blogsRoutes = [
  {
    index: true,
    async lazy() {
      let { default: List } = await import('../pages/Blogs/List');
      return { Component: List };
    },
    ErrorBoundary: ErrorInfoBack,
    async loader() {
      let { getAllBlogs } = await import('../api/blogs');
      return getAllBlogs();
    },
  },
  {
    path: ':id',
    async lazy() {
      let { default: Details } = await import('../pages/Blogs/Details');
      return { Component: Details };
    },
    ErrorBoundary: ErrorInfoBack,
    async loader({ params }) {
      let { getBlogById } = await import('../api/blogs');
      return getBlogById({ params });
    },
    handle: {
      crumb: (params, data) => (data?.blog ? <Link to={`/blogs/${params.id}`}>Blog ID: {params.id}</Link> : 'Error'),
    },
    children: [
      {
        index: true,
        async lazy() {
          let { default: DetailsIndex } = await import('../pages/Blogs/DetailsIndex');
          return { Component: DetailsIndex };
        },
        ErrorBoundary: ErrorInfoBack,
      },
      {
        path: 'edit',
        async lazy() {
          let { default: Edit } = await import('../pages/Blogs/Edit');
          return { Component: Edit };
        },
        ErrorBoundary: ErrorInfoBack,
        async action({ params, request }) {
          let { updateBlogById } = await import('../api/blogs');
          return updateBlogById({ params, request });
        },
      },
      {
        path: 'destroy',
        ErrorBoundary: ErrorInfoBack,
        async action({ params }) {
          let { deleteBlogById } = await import('../api/blogs');
          return deleteBlogById({ params });
        },
      },
    ],
  },
  {
    Component: () => <RequireAuth permittedRoles={['Admin', 'Trainer', 'Member']} />,
    children: [
      {
        path: 'new',
        ErrorBoundary: ErrorInfoBack,
        async action({ request }) {
          let { createBlog } = await import('../api/blogs');
          return createBlog({ request });
        },
        handle: { crumb: () => <Link to='/blogs/new'>New Blog</Link> },
      },
    ],
  },
];

export default blogsRoutes;
