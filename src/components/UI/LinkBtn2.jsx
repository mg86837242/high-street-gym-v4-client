import { Link } from 'react-router-dom';

export function LinkBtn2({ children, to, state, replace, w }) {
  return (
    <Link
      to={to}
      state={state}
      replace={replace}
      className={`${w} btn-primary btn text-primary-content shadow shadow-black/50`}
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
      className={`${w} btn-primary btn-sm btn text-primary-content shadow shadow-black/50`}
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
      className={`${w} btn-outline btn-primary btn-sm btn text-primary-content shadow shadow-black/50`}
    >
      {children}
    </Link>
  );
}
