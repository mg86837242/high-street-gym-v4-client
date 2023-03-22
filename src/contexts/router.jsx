import { createBrowserRouter, Link } from 'react-router-dom';
import Home from '../pages/Home';
import ErrorInfo from '../components/ErrorInfo';
import PageLayout from '../pages/PageLayout';
import bookingsRoutes from './bookingsRoutes';
import { ProfileEditIndex } from '../components/AuthUI/ProfilePanel';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
    ErrorBoundary: ErrorInfo,
  },
  {
    Component: PageLayout,
    ErrorBoundary: ErrorInfo,
    children: [
      {
        path: 'blogs',
        async lazy() {
          let { default: Blogs } = await import('../pages/Blogs');
          return { Component: Blogs };
        },
        ErrorBoundary: ErrorInfo,
      },
      {
        path: 'bookings',
        async lazy() {
          let { default: Bookings } = await import('../pages/Bookings');
          return { Component: Bookings };
        },
        ErrorBoundary: ErrorInfo,
        handle: { crumb: () => <Link to='/bookings'>Calendar</Link> },
        children: [...bookingsRoutes],
      },
      {
        path: 'activities',
        async lazy() {
          let { default: Activities } = await import('../pages/Activities');
          return { Component: Activities };
        },
        ErrorBoundary: ErrorInfo,
      },
      {
        path: 'admin',
        async lazy() {
          let { default: Admin } = await import('../pages/Admin');
          return { Component: Admin };
        },
        ErrorBoundary: ErrorInfo,
      },
      {
        path: 'profile',
        async lazy() {
          let { default: Profile } = await import('../pages/Profile');
          return { Component: Profile };
        },
        ErrorBoundary: ErrorInfo,
        children: [
          { index: true, Component: ProfileEditIndex },
          {
            path: 'account',
            async lazy() {
              let { ProfileEditAccount } = await import('../components/AuthUI/ProfilePanel');
              return { Component: ProfileEditAccount };
            },
            ErrorBoundary: ErrorInfo,
          },
          {
            path: 'blog',
            async lazy() {
              let { ProfileEditBlog } = await import('../components/AuthUI/ProfilePanel');
              return { Component: ProfileEditBlog };
            },
            ErrorBoundary: ErrorInfo,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    async lazy() {
      let { default: Login } = await import('../pages/Login');
      return { Component: Login };
    },
    ErrorBoundary: ErrorInfo,
  },
  {
    path: '/signup',
    async lazy() {
      let { default: Signup } = await import('../pages/Signup');
      return { Component: Signup };
    },
    ErrorBoundary: ErrorInfo,
    async loader() {
      let { getAllLoginEmails } = await import('../services/logins');
      return getAllLoginEmails();
    },
    async action({ request }) {
      let { signupMembers } = await import('../services/members');
      return signupMembers({ request });
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
//  modularizing routes, which also implies routes are just JSOn
// -- https://stackoverflow.com/questions/74443583/getting-error-with-createbrowserrouter-usenavigate-may-be-used-only-in-the-co:
//  How to render provider component when using React Router 6.4+ (pay attention to the comment section's sandbox)

// NB Error: `[vite] hmr invalidate /src/pages/BookingList.jsx Could not Fast Refresh. Learn more at
//  https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports` =>
//  Consistent components exports rule conflicts with React Router tutorial's design pattern by which the loader is
//  declared and exported on the same page as its associated component => further dig indicates that Vite has some
//  compatibility issue with React's context => Solution: (1) declare loader function in the `router.jsx`, not doing
//  this b/c lazy loading is in use, (2) declare loader function in a separate file
