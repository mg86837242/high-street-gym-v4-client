export default function Canvas({ children }) {
  return (
    <div
      id='canvas'
      className={`flex flex-col items-center w-full h-full pb-8 md:pb-0 bg-base-300 bg-[url('src/assets/home-hero.webp')] bg-cover bg-top`}
      // ??? Frequently fail to load as background image
    >
      {children}
    </div>
  );
}
