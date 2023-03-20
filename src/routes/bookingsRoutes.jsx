import { Link, redirect } from 'react-router-dom';
import { API_URL } from '../data/constants';
import fetchRes from '../utils/fetchRes';
import fetchJSON from '../utils/fetchJSON';
import ErrorInfo from '../components/ErrorInfo';
import BookingListIndex from '../components/Bookings/BookingListIndex';
import BookingDetails from '../components/Bookings/BookingDetails';
import BookingDetailsIndex from '../components/Bookings/BookingDetailsIndex';
import BookingEdit from '../components/Bookings/BookingEdit';
import BookingNew from '../components/Bookings/BookingNew';

const bookingsRoutes = [
  { index: true, Component: BookingListIndex },
  {
    path: ':date',
    ErrorBoundary: ErrorInfo,
    async loader({ params }) {
      let { default: loader } = await import('./bookingList-loader');
      return loader({ params });
    },
    lazy: () => import('../components/Bookings/BookingList'),
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
      { index: true, Component: BookingDetailsIndex },
      {
        path: 'id/:id',
        // HACK 1
        Component: BookingDetails,
        ErrorBoundary: ErrorInfo,
        async loader({ params }) {
          const response = await fetchRes(`${API_URL}/bookings/by-id/${params.id}`);
          return response;
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
        path: 'id/:id/edit',
        // HACK 2
        Component: BookingEdit,
        ErrorBoundary: ErrorInfo,
        async loader({ params }) {
          // Building customized API endpoint (1) is much simpler to code loader, (2) has one less nesting layer/level
          //  when calling `useLoaderData` and DA loader data, e.g., in `BookingEdit.jsx`, `bookingJSON:` can be rid of
          //  – easier to code component, same applies to breadcrumbs/`useMatches`.
          const response = await fetchRes(`${API_URL}/bookings/booking-and-options-by-id/${params.id}`);
          return response;
          // // Alternatively, fetch multiple endpoints with `Promise.all([])`:
          // // Code snippet from: https://stackoverflow.com/questions/74719956/can-i-handle-multiple-loaders-for-a-single-url-in-remix
          // // NB React Router's `json(response)` utility tested to be NOT working for multiple returns atm, directly
          // //  call `Response. json()` instead
          // const [bookingResponse, membersResponse, trainersResponse, activitiesResponse] = await Promise.all([
          //   fetch(`${API_URL}/bookings/by-id/${params.id}`),
          //   fetch(`${API_URL}/members`),
          //   fetch(`${API_URL}/trainers`),
          //   fetch(`${API_URL}/activities`),
          // ]);
          // const bookingJSON = await bookingResponse.json();
          // const membersJSON = await membersResponse.json();
          // const trainersJSON = await trainersResponse.json();
          // const activitiesJSON = await activitiesResponse.json();
          // return { bookingJSON, membersJSON, trainersJSON, activitiesJSON };
        },
        async action({ params, request }) {
          // "`<Form>` prevents(hijacks) the browser from sending the request to the server and sends it to your route
          //  `action` instead", see: https://reactrouter.com/en/main/start/tutorial#creating-contacts
          // NB "If the value is neither a `Blob` nor a `File`, the value is converted (by `Request.formData()`) to a
          //  STRING", see: https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects =>
          //  Observation: `{typeof a.id}` in `BookingEdit.jsx` shows 'number', while `console.log(formData)` here
          //  shows `string`.
          const formData = await request.formData();
          const updates = Object.fromEntries(formData);
          await fetchRes(`${API_URL}/bookings/${params.id}`, 'patch', updates);
          return redirect(`/bookings/${updates.date}/id/${params.id}`);
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
        // HACK 3
        path: 'id/:id/destroy',
        ErrorBoundary: ErrorInfo,
        async action({ params }) {
          await fetchRes(`${API_URL}/bookings/${params.id}`, 'delete');
          return redirect(`/bookings/${params.date}`);
        },
      },
    ],
  },
  {
    // HACK 4
    path: 'new',
    Component: BookingNew,
    ErrorBoundary: ErrorInfo,
    async loader() {
      const response = await fetchRes(`${API_URL}/bookings/options-only`);
      return response;
    },
    async action({ request }) {
      const formData = await request.formData();
      const creations = Object.fromEntries(formData);
      const json = await fetchJSON(`${API_URL}/bookings`, 'post', creations);
      return redirect(`/bookings/${creations.date}/id/${json.insertId}`);
    },
    handle: { crumb: () => <Link to='/bookings/new'>New Booking</Link> },
  },
];

export default bookingsRoutes;
