import { useState, useEffect, useCallback, useMemo } from 'react';
import AuthContext from '../context/AuthContext';
import router from '../routes/router';
import { RouterProvider } from 'react-router-dom';
import { getUserByKey, login, logout } from '../api/users';

export default function AppProviders() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  // This `useEffect`'s job is to synchronize with API by using an access key stored in the `localStorage` as a ref in
  //  case `authenticatedUser` state/context is missing after page reload, opening a new tab, etc.
  useEffect(() => {
    if (authenticatedUser) {
      // Effect runs - user state present, exit
      return;
    }
    const accessKey = localStorage.getItem('accessKey');
    if (!accessKey) {
      // Effect runs - key removed or missing from local storage, exit
      return;
    }
    let ignore = false;
    (async () => {
      try {
        const json = await getUserByKey(accessKey);
        if (!ignore) {
          // Effect runs - user state synchronizing
          setAuthenticatedUser(json.user);
        }
      } catch (error) {
        // Effect runs - synchronization failed
        router.navigate('/');
      }
    })();
    return () => {
      ignore = true;
    };
  }, [authenticatedUser]);

  const handleLogin = useCallback(
    async (email, password) => {
      setAuthenticatedUser(null);
      try {
        // Fetch POST /login to attempt to get `accessKey` from the API's json response
        const loginJSON = await login(email, password);
        if (loginJSON.status !== 200) {
          return typeof loginJSON.message === 'string' ? loginJSON.message : 'Invalid request to server';
        }
        try {
          // Set key in `localStorage` – persistent storage in case page is reloaded, etc.
          localStorage.setItem('accessKey', loginJSON.accessKey);
          // Fetch GET /users/by-key/:accessKey to attempt to get an obj called `user`
          const userJSON = await getUserByKey(loginJSON.accessKey);
          if (userJSON.status !== 200) {
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
        const json = await logout(accessKey);
        if (json.status !== 200) {
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

// References for `useContext`:
// -- https://react.dev/reference/react/useContext#updating-data-passed-via-context: Official recommended way of (1)
//  how to extract multiple providers to a single component => RELEVANT TO THIS PROJECT, and (2) how to create and
//  use context
// -- https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions:
//  Official recommended way of (1) how to provide obj and functions (custom Hook) as the context with caching
//  techniques, (2) how to name context value => BOTH ARE RELEVANT TO THIS PROJECT
// -- https://stackoverflow.com/questions/74443583/getting-error-with-createbrowserrouter-usenavigate-may-be-used-only-in-the-co:
//  How to render provider component when using React Router 6.4+ (see comment section's sandbox) => NOT relevant to
//  this project, b/c auth provider needs to be outside router provider
// -- https://codesandbox.io/s/react-usecontext-rydy5?file=/src/context/defaults.js: How to modularize files related to
//  context (source: Google "use context example codesandbox")

// References for `useEffect`:
// -- https://react.dev/learn/you-might-not-need-an-effect#sending-a-post-request: POST req w/ event-specific logic
//  doesn't need `useEffect`
// -- https://react.dev/learn/you-might-not-need-an-effect#sharing-logic-between-event-handlers: Interactions within
// `localStorage` within login/logout event handlers do not require `useEffect`

// References for usage of `navigate` outside of `<RouterProvider>`:
// -- https://stackoverflow.com/questions/69871987/react-router-v6-navigate-outside-of-components
// -- https://github.com/remix-run/react-router/issues/9422#issuecomment-1301182219
// -- `createBrowserRouter` => `RemixRouter` => `Router` interface's `navigate` method
// TODO (1) Integrate Supabase; (2) when receiving the `user` obj from the Supabase db, a fetch request will be
//  made to perform CRUD operations with `Members` or `Trainers` or `Admins` table within the backend db, i.e.,
//  synchronizing the Supabase db with the MySQL db
