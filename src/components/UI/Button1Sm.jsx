export default function Button1Sm({ children, type, onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} shadow btn btn-sm text-primary-content shadow-black/50`}>
      {children}
    </button>
  );
}
