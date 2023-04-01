export default function Button({ children, type, onClick, disabledCond }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabledCond}
      className={`w-full shadow btn btn-primary text-primary-content shadow-black/50`}
    >
      {children}
    </button>
  );
}
