import { Link } from 'react-router-dom';

export default function LinkButton2({ children, to, w }) {
  return (
    <Link to={to} className={`${w} shadow btn btn-primary text-primary-content shadow-black/50`}>
      {children}
    </Link>
  );
}
