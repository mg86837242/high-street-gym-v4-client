import { Link } from 'react-router-dom';
import ErrorInfoRefresh from '../components/ui/ErrorInfoRefresh';
import RequireAuth from '../components/layouts/RequireAuth';
import { getDateNotationNoYear } from '../helpers/mapDates';

const bookingsRoutes = [
  {
    index: true,
    async lazy() {
      const { default: ListIndex } = await import('../pages/Bookings/ListIndex');
      return { Component: ListIndex };
    },
  },
  {
    path: ':date',
    async lazy() {
      const { default: List } = await import('../pages/Bookings/List');
      return { Component: List };
    },
    ErrorBoundary: ErrorInfoRefresh,
    async loader({ params }) {
      const { getBookingsByDate } = await import('../api/bookings');
      return getBookingsByDate({ params });
    },
    handle: {
      // The shape of arguments passed into the below `crumb` method, which returns a render function, will affect the
      //  shape of arguments passed into the `map()` method when calling `useMatches` and defining `crumbs`; also the
      //  name of the method below can be anything, e.g., `breadcrumb`.
      crumb: (params, data) =>
        // In the API endpoint from which the `data` is fetched, 404 is designed to return an empty array called
        // `bookings` (i.e., the length is 0), o/w `data?.bookings` wouldn't exist and the following render function
        //  would render 'Error' string although 404 won't trigger an error in the loader (per the programmer's design);
        //  alternatively, in the API endpoint, don't throw 404 when the `bookings` array is empty
        data?.bookings ? (
          <Link to={`/bookings/${params.date}`}>
            No. of Bookings on {getDateNotationNoYear(params.date)}: {data.bookings.length}
          </Link>
        ) : (
          'Error'
        ),
    },
    children: [
      {
        index: true,
        async lazy() {
          const { default: DetailsIndex } = await import('../pages/Bookings/DetailsIndex');
          return { Component: DetailsIndex };
        },
      },
      {
        path: ':id',
        async lazy() {
          const { default: Details } = await import('../pages/Bookings/Details');
          return { Component: Details };
        },
        ErrorBoundary: ErrorInfoRefresh,
        async loader({ params }) {
          const { getBookingById } = await import('../api/bookings');
          return getBookingById({ params });
        },
        handle: {
          crumb: (params, data) =>
            data?.booking ? (
              <Link to={`/bookings/${params.date}/id/${params.id}`}>Booking ID: {params.id}</Link>
            ) : (
              'Error'
            ),
        },
      },
      {
        path: ':id/edit',
        async lazy() {
          const { default: Edit } = await import('../pages/Bookings/Edit');
          return { Component: Edit };
        },
        ErrorBoundary: ErrorInfoRefresh,
        async loader({ params }) {
          const { getBookingWithOptionsById } = await import('../api/bookings');
          return getBookingWithOptionsById({ params });
        },
        async action({ params, request }) {
          const { updateBookingById } = await import('../api/bookings');
          return updateBookingById({ params, request });
        },
        handle: {
          crumb: (params, data) =>
            data?.booking ? (
              <Link to={`/bookings/${params.date}/id/${params.id}/edit`}>Booking ID: {params.id}</Link>
            ) : (
              'Error'
            ),
        },
      },
      {
        path: ':id/destroy',
        ErrorBoundary: ErrorInfoRefresh,
        async action({ params }) {
          const { deleteBookingById } = await import('../api/bookings');
          return deleteBookingById({ params });
        },
      },
    ],
  },
  {
    Component: () => <RequireAuth permittedRoles={['Admin', 'Trainer', 'Member']} />,
    children: [
      {
        path: 'new',
        async lazy() {
          const { default: New } = await import('../pages/Bookings/New');
          return { Component: New };
        },
        ErrorBoundary: ErrorInfoRefresh,
        async loader() {
          const { getAllBookingOptions } = await import('../api/bookings');
          return getAllBookingOptions();
        },
        async action({ request }) {
          const { createBooking } = await import('../api/bookings');
          return createBooking({ request });
        },
        handle: { crumb: () => <Link to='/bookings/new'>New Booking</Link> },
      },
    ],
  },
];

export default bookingsRoutes;
