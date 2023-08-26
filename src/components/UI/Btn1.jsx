export function Btn1({ children, type = 'submit', onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-primary shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn1Sm({ children, type = 'submit', onClick, w, form }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-primary btn-sm shadow shadow-black/50`} form={form}>
      {children}
    </button>
  );
}

export function Btn1Xs({ children, type = 'submit', onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-primary btn-xs shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn1SmOutline({ children, type = 'submit', onClick, w, form }) {
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

export function Btn1XsOutline({ children, type = 'submit', onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-primary btn-outline btn-xs shadow shadow-black/50`}>
      {children}
    </button>
  );
}
