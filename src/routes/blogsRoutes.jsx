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
];

export default blogsRoutes;
