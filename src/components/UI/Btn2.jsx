export function Btn2({ children, type, onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn-primary btn shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn2Sm({ children, type, onClick, w, form }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn-primary btn-sm btn shadow shadow-black/50`} form={form}>
      {children}
    </button>
  );
}

export function Btn2Xs({ children, type, onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn-primary btn-xs btn shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn2SmOutline({ children, type, onClick, w, form }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} btn-outline btn-primary btn-sm btn shadow shadow-black/50`}
      form={form}
    >
      {children}
    </button>
  );
}

export function Btn2XsOutline({ children, type, onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn-outline btn-primary btn-xs btn shadow shadow-black/50`}>
      {children}
    </button>
  );
}
