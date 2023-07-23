import { Link } from 'react-router-dom';
import ErrorInfoRefresh from '../components/ui/ErrorInfoRefresh';
import PageLayout from '../components/layouts/PageLayout';
import RequireAuth from '../components/layouts/RequireAuth';
import Home from '../pages/Home';
import Login from '../pages/Login';
import blogsRoutes from './blogsRoutes';
import bookingsRoutes from './bookingsRoutes';
import profileRoutes from './profileRoutes';
import adminRoutes from './adminRoutes';

const routes = [
  {
    path: '/',
    Component: Home,
    ErrorBoundary: ErrorInfoRefresh,
  },
  {
    Component: PageLayout,
    children: [
      {
        path: 'blogs',
        async lazy() {
          let { default: Blogs } = await import('../pages/Blogs');
          return { Component: Blogs };
        },
        ErrorBoundary: ErrorInfoRefresh,
        handle: { crumb: () => <Link to='/blogs'>All Blogs</Link> },
        children: [...blogsRoutes],
      },
      {
        path: 'bookings',
        async lazy() {
          let { default: Bookings } = await import('../pages/Bookings');
          return { Component: Bookings };
        },
        ErrorBoundary: ErrorInfoRefresh,
        handle: { crumb: () => <Link to='/bookings'>Calendar</Link> },
        children: [...bookingsRoutes],
      },
      {
        Component: () => <RequireAuth permittedRoles={['Admin', 'Trainer', 'Member']} />,
        children: [
          {
            path: 'profile',
            async lazy() {
              let { default: Profile } = await import('../pages/Profile');
              return { Component: Profile };
            },
            ErrorBoundary: ErrorInfoRefresh,
            children: [...profileRoutes],
          },
        ],
      },
      {
        Component: () => <RequireAuth permittedRoles={['Admin', 'Trainer']} />,
        children: [
          {
            path: 'admin',
            async lazy() {
              let { default: Admin } = await import('../pages/Admin');
              return { Component: Admin };
            },
            ErrorBoundary: ErrorInfoRefresh,
            children: [...adminRoutes],
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    Component: Login,
    ErrorBoundary: ErrorInfoRefresh,
  },
  {
    path: '/signup',
    async lazy() {
      let { default: Signup } = await import('../pages/Signup');
      return { Component: Signup };
    },
    ErrorBoundary: ErrorInfoRefresh,
    async action({ request }) {
      let { signupMembers } = await import('../api/members');
      return signupMembers({ request });
    },
  },
  // NB `/api/*` calls are handled by NGINX's reverse proxy, see: https://www.youtube.com/watch?v=NjYsXuSBZ5U &&
  //  https://github.com/Sanjeev-Thiyagarajan/PERN-STACK-DEPLOYMENT#7-install-and-configure-nginx
  {
    path: '*',
    async lazy() {
      let { default: NotFound } = await import('../components/ui/NotFound');
      return { Component: NotFound };
    },
  },
];

export default routes;

// References:
// -- https://reactrouter.com/en/main/start/concepts#defining-routes: Official example of defining routes with React
//  Router
// -- https://reactrouter.com/en/main/start/concepts#rendering: Official recommended usage of outlets, index routes and
//  render routes
// -- https://github.com/remix-run/react-router/releases/tag/react-router%406.9.0: Official recommended way of
//  modularizing routes, which also implies routes are just JSON
// -- https://stackoverflow.com/questions/69868956/how-can-i-redirect-in-react-router-v6: Solution adopted to cope with
//  the lack of index route for `/profile` – using `<Navigate>`

// NB Error: `[vite] hmr invalidate /src/pages/Bookings/List.jsx Could not Fast Refresh. Learn more at
//  https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports` =>
//  Consistent components exports rule conflicts with React Router tutorial's design pattern by which the loader is
//  declared and exported on the same page as its associated component => further dig indicates that Vite has some
//  compatibility issue with React's context => Solution: (1) declare loader function in the `router.jsx`, not doing
//  this b/c lazy loading and dynamic import are in use, (2) declare loader function in a separate file
