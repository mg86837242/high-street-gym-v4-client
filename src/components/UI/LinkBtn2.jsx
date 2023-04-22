import { Link } from 'react-router-dom';

export function LinkBtn2({ children, to, state, replace, w }) {
  return (
    <Link
      to={to}
      state={state}
      replace={replace}
      className={`${w} shadow btn btn-primary text-primary-content shadow-black/50`}
    >
      {children}
    </Link>
  );
}

export function LinkBtn2Sm({ children, to, state, replace, w }) {
  return (
    <Link
      to={to}
      state={state}
      replace={replace}
      className={`${w} shadow btn btn-primary btn-sm text-primary-content shadow-black/50`}
    >
      {children}
    </Link>
  );
}

export function LinkBtn2SmOutline({ children, to, state, replace, w }) {
  return (
    <Link
      to={to}
      state={state}
      replace={replace}
      className={`${w} shadow btn btn-primary btn-sm btn-outline text-primary-content shadow-black/50`}
    >
      {children}
    </Link>
  );
}
