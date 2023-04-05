import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth({ roles }) {
  const { authenticatedUser } = useContext(AuthContext);
  const location = useLocation();
  const canAccess = roles.includes(authenticatedUser?.role);

  return canAccess ? <Outlet /> : <Navigate to='/404' state={{ from: location }} />;
}

// References for role-base routing in RRD 6.4+:
// (1) Wrapper method (emulating protected/private routes):
// -- https://stackoverflow.com/questions/70564888: simple ver
// -- https://stackoverflow.com/questions/62384395: full ver – top 2 answers & official example
// -- https://stackoverflow.com/questions/70743498: roles array & <Suspense> & TS variation
// (2) Conditional providing routes method
// -- https://codesandbox.io/s/5d40ro: anti-pattern, see Discord comments
// -- Discord: "I would create a single route with all router, then in the loader of the routes I would check the role
//  of the user and if it doesn’t have access I would either render a 404 (to hide the existence of the route) or
//  redirect (if the user can know that exists but it doesn’t have access)", by Sergio

// References for passing ctx (e.g., role info) to the loader
// -- https://github.com/remix-run/react-router/discussions/9564: The Official proposal of middleware feature to help
//  pass ctx to the loader
