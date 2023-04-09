import { Link } from 'react-router-dom';

export function LinkBtn2({ children, to, w }) {
  return (
    <Link to={to} className={`${w} shadow btn btn-primary text-primary-content shadow-black/50`}>
      {children}
    </Link>
  );
}

export function LinkBtn2Sm({ children, to, w }) {
  return (
    <Link to={to} className={`${w} shadow btn btn-primary btn-sm text-primary-content shadow-black/50`}>
      {children}
    </Link>
  );
}

export function LinkBtn2SmOutline({ children, to, w }) {
  return (
    <Link to={to} className={`${w} shadow btn btn-primary btn-sm btn-outline text-primary-content shadow-black/50`}>
      {children}
    </Link>
  );
}