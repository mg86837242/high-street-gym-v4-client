import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Navigate, useLocation, Outlet, useOutletContext } from 'react-router-dom';

export default function RequireAuth({ permittedRoles }) {
  const { authenticatedUser } = useContext(AuthContext);
  const location = useLocation();
  const outletContext = useOutletContext();
  const canAccess = permittedRoles?.includes(authenticatedUser?.role);

  if (!canAccess) {
    return <Navigate to='/404' state={{ from: location }} replace />;
  } else if (outletContext) {
    return <Outlet context={outletContext} />;
  } else {
    return <Outlet />;
  }

  // return canAccess ? <Outlet /> : <Navigate to='/404' state={{ from: location }} replace />;
}

// References for role-base routing in RRD 6.4+:
// (1) Wrapper method (emulating protected/private routes):
// -- https://github.com/remix-run/react-router/blob/dev/examples/auth/src/App.tsx: simple ver
// -- https://stackoverflow.com/questions/62384395: full ver – top 2 answers & official example
// -- https://stackoverflow.com/questions/70743498: roles array & <Suspense> & TS variation
// (2) Conditional providing router method => anti-pattern
// -- https://codesandbox.io/s/5d40ro => anti-pattern, see Discord comments
// -- Discord: "I would create a single route with all router, then in the loader of the routes I would check the role
//  of the user and if it doesn’t have access I would either render a 404 (to hide the existence of the route) or
//  redirect (if the user can know that exists but it doesn’t have access)", by Sergio

// References for passing ctx (e.g., role info) to the loader
// -- https://github.com/remix-run/react-router/discussions/9564: The Official proposal of middleware feature to help
//  pass ctx to the loader
