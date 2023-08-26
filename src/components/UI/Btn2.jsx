export function Btn2({ children, type = 'submit', onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-secondary shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn2Sm({ children, type = 'submit', onClick, w, form }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} btn btn-secondary btn-sm shadow shadow-black/50`}
      form={form}
    >
      {children}
    </button>
  );
}

export function Btn2Xs({ children, type = 'submit', onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-secondary btn-xs shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn2SmOutline({ children, type = 'submit', onClick, w, form }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} btn btn-secondary btn-outline btn-sm shadow shadow-black/50`}
      form={form}
    >
      {children}
    </button>
  );
}

export function Btn2XsOutline({ children, type = 'submit', onClick, w }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} btn btn-secondary btn-outline btn-xs shadow shadow-black/50`}
    >
      {children}
    </button>
  );
}
