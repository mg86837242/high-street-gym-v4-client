export default function Canvas({ children }) {
  return (
    <div
      id='canvas'
      className={`flex flex-col items-center w-full h-full pb-8 md:pb-0 bg-base-300 bg-[url('src/assets/home-hero.webp')] bg-cover bg-top`}
    >
      {children}
    </div>
  );
}

// References:
// -- https://tailwindcomponents.com/component/free-tailwind-css-sign-in-component
