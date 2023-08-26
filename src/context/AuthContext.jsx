import { createContext, useCallback, useEffect, useMemo,useState } from 'react';

import { getUserByKey, login, logout } from '../api/users';
import { deleteCredentials,getCredentials, storeCredentials } from '../helpers/localStorage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
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
    // Fetch GET /users/key/:accessKey to attempt to get an obj called `user`
    getUserByKey(accessKey)
      .then(json => {
        if (!ignore) {
          setUser(json.user);
        }
      })
      .catch(() => {
        router.navigate('/');
      });

    return () => {
      ignore = true;
    };
  }, [user]);

  const handleLogin = useCallback(async (email, password, callback) => {
    try {
      setUser(null);
      // Fetch POST /users/login to attempt to get `accessKey` from the API's json response
      const loginJSON = await login(email, password);
      if (loginJSON?.status !== 200) {
        throw new Error(loginJSON?.message);
      }
      storeCredentials(loginJSON.accessKey);
      // Fetch GET /users/key/:accessKey to attempt to get an obj called `user`
      const userJSON = await getUserByKey(loginJSON.accessKey);
      if (userJSON?.status !== 200) {
        throw new Error(userJSON?.message);
      }
      setUser(userJSON.user);
      callback();
    } catch (error) {
      throw new Error('Server Error');
    }
  }, []);

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
    [user],
  );

  const value = useMemo(
    () => ({
      user,
      handleLogin,
      handleLogout,
    }),
    [user, handleLogin, handleLogout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// References for `useContext`:
// -- https://react.dev/reference/react/useContext#updating-data-passed-via-context: official recommended way of (1)
//  how to extract multiple providers to a single component => RELEVANT TO THIS PROJECT, and (2) how to create and
//  use context
// -- https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions:
//  official recommended way of (1) how to provide obj and functions (custom Hook) as the context with caching
//  techniques, (2) how to name context value => BOTH ARE RELEVANT TO THIS PROJECT
// -- https://stackoverflow.com/questions/74443583/: how to render provider component when using React Router 6.4+ (see
//  comment section's sandbox) => NOT relevant to this project, b/c auth provider needs to be outside router provider
// -- https://codesandbox.io/s/react-usecontext-rydy5?file=/src/context/defaults.js: how to modularize files related to
//  context (source: Google "use context example codesandbox")

// References for `useEffect`:
// -- https://react.dev/learn/you-might-not-need-an-effect#sending-a-post-request: POST req w/ event-specific logic
//  doesn't need `useEffect`
// -- https://react.dev/learn/you-might-not-need-an-effect#sharing-logic-between-event-handlers: interactions within
// `localStorage` within login/logout event handlers do not require `useEffect`

// References for usage of `navigate` outside of `<RouterProvider>`:
// -- https://stackoverflow.com/questions/69871987/react-router-v6-navigate-outside-of-components
// -- https://github.com/remix-run/react-router/issues/9422#issuecomment-1301182219
// -- `createBrowserRouter` => `RemixRouter` => `Router` interface's `navigate` method
