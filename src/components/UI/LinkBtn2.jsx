import { Link } from 'react-router-dom';

export function LinkBtn2({ children, to, state, replace, w }) {
  return (
    <Link
      to={to}
      state={state}
      replace={replace}
      className={`${w} btn btn-primary text-primary-content shadow shadow-black/50`}
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
      className={`${w} btn btn-primary btn-sm text-primary-content shadow shadow-black/50`}
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
      className={`${w} btn btn-outline btn-primary btn-sm text-primary-content shadow shadow-black/50`}
    >
      {children}
    </Link>
  );
}
