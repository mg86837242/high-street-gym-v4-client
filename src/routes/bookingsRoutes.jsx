import { Link } from 'react-router-dom';
import ErrorInfoBack from '../components/UI/ErrorInfoBack';

const bookingsRoutes = [
  {
    index: true,
    async lazy() {
      let { default: ListIndex } = await import('../components/Bookings/ListIndex');
      return { Component: ListIndex };
    },
  },
  {
    path: ':date',
    async lazy() {
      let { default: List } = await import('../components/Bookings/List');
      return { Component: List };
    },
    ErrorBoundary: ErrorInfoBack,
    async loader({ params }) {
      let { getBookingsByDate } = await import('../api/bookings');
      return getBookingsByDate({ params });
    },
    handle: {
      // The shape of arguments passed into the below `crumb` method, which returns a render function, will affect the
      //  shape of arguments passed into the `map()` method when calling `useMatches` and defining `crumbs`; also the
      //  name of the method below can be anything, e.g., `breadcrumb`.
      crumb: (params, data) => {
        // In the API endpoint from which the `data` is fetched, 404 is designed to return an empty array called
        // `bookings` (i.e., the length is 0), o/w `data?.bookings` wouldn't exist and the following render function
        //  would render 'Error' text although 404 won't trigger an error in the loader (per the programmer's design);
        //  alternatively, in the API endpoint, don't throw 404 when the `bookings` array is empty
        return data?.bookings ? (
          <Link to={`/bookings/${params.date}`}>No. of Bookings: {data.bookings.length}</Link>
        ) : (
          'Error'
        );
      },
    },
    children: [
      {
        index: true,
        async lazy() {
          let { default: DetailsIndex } = await import('../components/Bookings/DetailsIndex');
          return { Component: DetailsIndex };
        },
      },
      {
        path: ':id',
        async lazy() {
          let { default: Details } = await import('../components/Bookings/Details');
          return { Component: Details };
        },
        ErrorBoundary: ErrorInfoBack,
        async loader({ params }) {
          let { getBookingById } = await import('../api/bookings');
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
          let { default: Edit } = await import('../components/Bookings/Edit');
          return { Component: Edit };
        },
        ErrorBoundary: ErrorInfoBack,
        async loader({ params }) {
          let { getBookingAndOptionsById } = await import('../api/bookings');
          return getBookingAndOptionsById({ params });
        },
        async action({ params, request }) {
          let { updateBookingById } = await import('../api/bookings');
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
        ErrorBoundary: ErrorInfoBack,
        async action({ params }) {
          let { deleteBookingById } = await import('../api/bookings');
          return deleteBookingById({ params });
        },
      },
    ],
  },
  {
    path: 'new',
    async lazy() {
      let { default: New } = await import('../components/Bookings/New');
      return { Component: New };
    },
    ErrorBoundary: ErrorInfoBack,
    async loader() {
      let { getAllBookingOptions } = await import('../api/bookings');
      return getAllBookingOptions();
    },
    async action({ request }) {
      let { createBooking } = await import('../api/bookings');
      return createBooking({ request });
    },
    handle: { crumb: () => <Link to='/bookings/new'>New Booking</Link> },
  },
];

export default bookingsRoutes;
