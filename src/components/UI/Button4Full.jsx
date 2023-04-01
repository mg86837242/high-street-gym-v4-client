export default function Button({ children, type, onClick, disabledCond }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabledCond}
      className={`w-full shadow btn glass bg-base-100 text-accent-content shadow-black/50`}
    >
      {children}
    </button>
  );
}
