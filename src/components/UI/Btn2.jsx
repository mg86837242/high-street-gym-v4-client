export function Btn2({ children, type, onClick, w }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} shadow btn btn-primary text-primary-content shadow-black/50`}
    >
      {children}
    </button>
  );
}

export function Btn2Sm({ children, type, onClick, w, form }) {
  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      className={`${w} shadow btn btn-primary btn-sm text-primary-content shadow-black/50`}
    >
      {children}
    </button>
  );
}

export function Btn2SmOutline({ children, type, form, onClick, w }) {
  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      className={`${w} shadow btn btn-primary btn-sm btn-outline text-primary-content shadow-black/50`}
    >
      {children}
    </button>
  );
}
