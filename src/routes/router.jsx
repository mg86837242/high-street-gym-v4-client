import { createBrowserRouter, Link } from 'react-router-dom';
import ErrorInfoBack from '../components/ErrorInfoBack';
import Home from '../pages/Home';
import PageLayout from '../pages/PageLayout';
import Login from '../pages/Login';
import bookingsRoutes from './bookingsRoutes';
import profileRoutes from './profileRoutes';
import adminRoutes from './adminRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
    ErrorBoundary: ErrorInfoBack,
  },
  {
    Component: PageLayout,
    ErrorBoundary: ErrorInfoBack,
    children: [
      {
        path: 'blogs',
        async lazy() {
          let { default: Blogs } = await import('../pages/Blogs');
          return { Component: Blogs };
        },
        ErrorBoundary: ErrorInfoBack,
      },
      {
        path: 'bookings',
        async lazy() {
          let { default: Bookings } = await import('../pages/Bookings');
          return { Component: Bookings };
        },
        ErrorBoundary: ErrorInfoBack,
        handle: { crumb: () => <Link to='/bookings'>Calendar</Link> },
        children: [...bookingsRoutes],
      },
      {
        path: 'profile',
        async lazy() {
          let { default: Profile } = await import('../pages/Profile');
          return { Component: Profile };
        },
        ErrorBoundary: ErrorInfoBack,
        children: [...profileRoutes],
      },
      {
        path: 'admin',
        async lazy() {
          let { default: Admin } = await import('../pages/Admin');
          return { Component: Admin };
        },
        ErrorBoundary: ErrorInfoBack,
        children: [...adminRoutes],
      },
    ],
  },
  {
    path: '/login',
    Component: Login,
    ErrorBoundary: ErrorInfoBack,
  },
  {
    path: '/signup',
    async lazy() {
      let { default: Signup } = await import('../pages/Signup');
      return { Component: Signup };
    },
    ErrorBoundary: ErrorInfoBack,
    async loader() {
      let { getAllEmails } = await import('../services/logins');
      return getAllEmails();
    },
    async action({ request }) {
      let { signupMembers } = await import('../services/members');
      return signupMembers({ request });
    },
  },
  {
    path: '*',
    async lazy() {
      let { NotFoundView } = await import('../components/NotFound');
      return { Component: NotFoundView };
    },
  },
]);

export default router;

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
