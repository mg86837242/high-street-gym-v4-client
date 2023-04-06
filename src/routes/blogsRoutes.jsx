import { Link, redirect } from 'react-router-dom';
import ErrorInfoBack from '../components/UI/ErrorInfoBack';

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
      crumb: (params, data) => (data?.blog ? <Link to={`/blogs/${params.id}`}>Blog ID: {params.id}</Link> : 'Error'),
    },
    children: [
      {
        index: true,
        async lazy() {
          let { default: DetailsIndex } = await import('../components/Blogs/DetailsIndex');
          return { Component: DetailsIndex };
        },
        ErrorBoundary: ErrorInfoBack,
      },
      {
        path: 'edit',
        async lazy() {
          let { default: Edit } = await import('../components/Blogs/Edit');
          return { Component: Edit };
        },
        ErrorBoundary: ErrorInfoBack,
        async action({ params, request }) {
          let { updateBlogById } = await import('../api/blogs');
          return updateBlogById({ params, request });
        },
      },
    ],
  },
  {
    path: 'new',
    async lazy() {
      let { default: New } = await import('../components/blogs/New');
      return { Component: New };
    },
    ErrorBoundary: ErrorInfoBack,
    async action({ request }) {
      // FIX (1) zod schema to disallow emoji OR allow emoji in DB (2) new action (3) cleanup btn (grping together into 1 file for each color)
      let { createBlog } = await import('../api/blogs');
      return createBlog({ request });
    },
    handle: { crumb: () => <Link to='/blogs/new'>New Blog</Link> },
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
