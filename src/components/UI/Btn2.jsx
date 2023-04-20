export function Btn2({ children, type, onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} shadow btn btn-primary shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn2Sm({ children, type, onClick, w, form }) {
  return (
    <button type={type} onClick={onClick} className={`${w} shadow btn btn-primary btn-sm shadow-black/50`} form={form}>
      {children}
    </button>
  );
}

export function Btn2Xs({ children, type, onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} shadow btn btn-primary btn-xs shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn2SmOutline({ children, type, onClick, w, form }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} shadow btn btn-primary btn-sm btn-outline shadow-black/50`}
      form={form}
    >
      {children}
    </button>
  );
}

export function Btn2XsOutline({ children, type, onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} shadow btn btn-primary btn-xs btn-outline shadow-black/50`}>
      {children}
    </button>
  );
}
