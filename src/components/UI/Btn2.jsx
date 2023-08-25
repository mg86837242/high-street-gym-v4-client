export function Btn2({ children, type, onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-primary shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn2Sm({ children, type, onClick, w, form }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-primary btn-sm shadow shadow-black/50`} form={form}>
      {children}
    </button>
  );
}

export function Btn2Xs({ children, type, onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-primary btn-xs shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn2SmOutline({ children, type, onClick, w, form }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} btn btn-primary btn-outline btn-sm shadow shadow-black/50`}
      form={form}
    >
      {children}
    </button>
  );
}

export function Btn2XsOutline({ children, type, onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-primary btn-outline btn-xs shadow shadow-black/50`}>
      {children}
    </button>
  );
}
