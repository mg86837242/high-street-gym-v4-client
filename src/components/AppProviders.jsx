import { useState, useEffect, useCallback, useMemo } from 'react';
import AuthContext from '../contexts/AuthContext';
import router from '../contexts/router';
import { RouterProvider } from 'react-router-dom';
import { API_URL } from '../data/constants';
import get from '../utils/get';
import post from '../utils/post';

export default function AppProviders() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  // This `useEffect`'s job is to synchronize with API by using an access key stored in the `localStorage` as a ref in
  //  case `authenticatedUser` state/context is missing after page reload, opening a new tab, etc.
  useEffect(() => {
    if (authenticatedUser) {
      console.log('🔃 Effect runs - user state present, exit');
      return;
    }
    const accessKey = localStorage.getItem('accessKey');
    if (!accessKey) {
      console.log('🔃 Effect runs - key removed or missing from local storage, exit');
      router.navigate('/');
      return;
    }
    let ignore = false;
    get(`${API_URL}/users/by-key/${accessKey}`)
      .then((json) => {
        if (!ignore) {
          console.log('🔃 Effect runs - user state synchronized');
          setAuthenticatedUser(json.user);
        }
      })
      .catch(() => {
        console.log('🔃 Effect runs - synchronization fetch failed');
        router.navigate('/');
      });
    return () => {
      ignore = true;
    };
  }, [authenticatedUser]);

  const handleLogin = useCallback(
    async (email, password) => {
      setAuthenticatedUser(null);
      try {
        // Fetch POST /login to attempt to get `accessKey` from the API's json response
        const loginRes = await post(`${API_URL}/login`, { email, password });
        const loginJSON = await loginRes.json();
        if (!loginRes.ok) {
          return typeof loginJSON.message === 'string' ? loginJSON.message : 'Invalid request to server';
        }
        try {
          // Set key in `localStorage` – persistent storage in case page is reloaded
          localStorage.setItem('accessKey', loginJSON.accessKey);
          // Fetch GET /users/by-key/:accessKey to attempt to get an obj called `user`
          const userRes = await get(`${API_URL}/users/by-key/${loginJSON.accessKey}`);
          const userJSON = await userRes.json();
          if (!userRes.ok) {
            return typeof userJSON.message === 'string' ? userJSON.message : 'Invalid request to server';
          }
          setAuthenticatedUser(userJSON.user);
          // PS After this second setter, console log `authenticatedUser` outputs `null`, which is what's set in the
          //  first setter, this is b/c React batches state updates, see: https://stackoverflow.com/questions/33613728/what-happens-when-using-this-setstate-multiple-times-in-react-component
          return loginJSON.message;
        } catch (error) {
          return 'Server failed to load user';
        }
      } catch (error) {
        return 'Server failed to login';
      }
    },
    [authenticatedUser]
  );

  const handleLogout = useCallback(async () => {
    try {
      // Remove key from `localStorage`
      localStorage.removeItem('accessKey');
      if (authenticatedUser) {
        // Fetch POST /logout to attempt to remove `accessKey` from its login row
        const { accessKey } = authenticatedUser;
        const response = await post(`${API_URL}/logout`, { accessKey });
        const json = await response.json();
        if (!response.ok) {
          return (message = typeof json.message === 'string' ? json.message : 'Invalid request to server');
        }
        setAuthenticatedUser(null);
        return json.message;
      }
      return 'No authenticated user recognized';
    } catch (error) {
      setAuthenticatedUser(null);
      return 'Server failed to logout';
    }
  }, [authenticatedUser]);

  const authContextValue = useMemo(
    () => ({
      authenticatedUser,
      handleLogin,
      handleLogout,
    }),
    [authenticatedUser, handleLogin, handleLogout]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

// References:
// -- https://react.dev/reference/react/useContext#updating-data-passed-via-context: Official recommended way
//  of (1) how to extract multiple providers to a single component, and how to name this overarching component =>
//  RELEVANT TO THIS PROJECT, and (2) how to create and use context in this case
// -- https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions:
//  Official recommended way of (1) how to provide object and functions (custom Hook) as the context with caching
//  techniques, (2) how to name context value => BOTH ARE RELEVANT TO THIS PROJECT
// -- https://stackoverflow.com/questions/74443583/getting-error-with-createbrowserrouter-usenavigate-may-be-used-only-in-the-co:
//  How to render provider component when using React Router 6.4+ (see comment section's sandbox) => NOT relevant to
//  this project, but could still be useful in the future
// -- https://codesandbox.io/s/react-usecontext-rydy5?file=/src/context/defaults.js: How to modularize files related to
//  context (source: Google "use context example codesandbox")

// NB For using `navigate` outside of `<RouterProvider>`, see:
// -- https://stackoverflow.com/questions/69871987/react-router-v6-navigate-outside-of-components
// -- https://github.com/remix-run/react-router/issues/9422#issuecomment-1301182219
// -- Peek `createBrowserRouter` => `RemixRouter` => `Router` interface's `navigate` method
// NB POST req w/ event-specific logic doesn't need `useEffect`, see: https://react.dev/learn/you-might-not-need-an-effect#sending-a-post-request
// NB Interactions within `localStorage` within login/logout event handlers do not require `useEffect`, see:
//  https://react.dev/learn/you-might-not-need-an-effect#sharing-logic-between-event-handlers
// NB The 3 fetches within login/logout event handlers can't be cleaned up by utility b/c possible returned messages
//  are (1) POST /login !response.ok json.message, (2) POST /login response.ok json, (3) GET /users !response.ok
//  message, (4) POST /login response.ok json.message, (5) POST /logout !response.ok json.message, (6) POST /logout
//  response.ok json.message – too inconsistent to be consolidated
// TODO (1) Integrate Supabase; (2) when receiving the `user` obj from the Supabase db, a fetch request will be
//  made to perform CRUD operations with `Members` or `Trainers` or `Admins` table within the backend db, i.e.,
//  synchronizing the Supabase db with the MySQL db
