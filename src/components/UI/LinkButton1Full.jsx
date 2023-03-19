import { Link } from 'react-router-dom';

export default function LinkButton({ children, to }) {
  return (
    <Link to={to} className={`normal-case shadow w-full btn btn-primary text-primary-content shadow-black/50`}>
      {children}
    </Link>
  );
}
