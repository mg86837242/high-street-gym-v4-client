import { useState, useEffect, useCallback, useMemo } from 'react';
import AuthContext from '../context/AuthContext';
import router from '../App';
import { getCredentials, storeCredentials, deleteCredentials } from '../helpers/localStorage';
import { getUserByKey, login, logout } from '../api/users';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // This `useEffect`'s job is to synchronize with API by using an `accessKey` stored in the `localStorage` as a ref in
  //  case `user` state/context is missing after reloading page, opening a new tab, deleting the `accessKey` from the
  //  browser manually, etc. The control flow statement is designed as follows:
  //  (1) Effect runs - user state present, exit
  //  (2) Effect runs - key removed or missing from local storage, exit
  //  (3) Effect runs - user state synchronized
  //  (4) Effect runs - synchronization (the fetch) failed, navigate to home
  useEffect(() => {
    if (user) {
      return;
    }
    const accessKey = getCredentials();
    if (!accessKey) {
      return;
    }
    let ignore = false;
    getUserByKey(accessKey)
      .then(json => {
        if (!ignore) {
          setUser(json.user);
        }
      })
      .catch(() => {
        router.navigate('/');
      });

    return () => (ignore = true);
  }, [user]);

  const handleLogin = useCallback(
    async (email, password) => {
      try {
        setUser(null);
        // Fetch POST /users/login to attempt to get `accessKey` from the API's json response
        const loginJSON = await login(email, password);
        if (loginJSON?.status !== 200) {
          throw new Error(loginJSON?.message);
        }
        storeCredentials(loginJSON.accessKey);
        // Fetch GET /users/by_key/:access_key to attempt to get an obj called `user`
        const userJSON = await getUserByKey(loginJSON.accessKey);
        if (userJSON?.status !== 200) {
          throw new Error(userJSON?.message);
        }
        setUser(userJSON.user);
      } catch (error) {
        throw new Error(error);
      }
    },
    [user]
  );

  const handleLogout = useCallback(
    async callback => {
      deleteCredentials();
      if (!user) {
        return;
      }
      // Fetch POST /users/logout to attempt to remove `accessKey` from its login row
      await logout(user.accessKey);
      setUser(null);
      callback();
    },
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      handleLogin,
      handleLogout,
    }),
    [user, handleLogin, handleLogout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
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

// TODO (1) Integrate Supabase; (2) when receiving the `user` obj from the Supabase db, a fetch request will be made to perform CRUD operations with `Members` or `Trainers` or `Admins` table within the backend db, i.e., synchronizing the Supabase db with the MySQL db
