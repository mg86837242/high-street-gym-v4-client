import { Link } from 'react-router-dom';
import ErrorInfoBack from '../components/ErrorInfoBack';

const blogsRoutes = [
  {
    index: true,
    async lazy() {
      let { default: List } = await import('../components/Blogs/List');
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
      let { default: Details } = await import('../components/Blogs/Details');
      return { Component: Details };
    },
    ErrorBoundary: ErrorInfoBack,
    async loader({ params }) {
      let { getBlogById } = await import('../api/blogs');
      return getBlogById({ params });
    },
    handle: {
      crumb: (params, data) => (data?.blog ? <Link to={`/blogs/id/${params.id}`}>Blog ID: {params.id}</Link> : 'Error'),
    },
  },
  {
    path: 'new',
    async lazy() {
      let { default: New } = await import('../components/blogs/New');
      return { Component: New };
    },
    ErrorBoundary: ErrorInfoBack,
    async action({ request }) {
      let { createBlog } = await import('../api/blogs');
      return createBlog({ request });
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
];

export default blogsRoutes;
