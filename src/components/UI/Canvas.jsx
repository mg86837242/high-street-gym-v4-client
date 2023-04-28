export default function Canvas({ children }) {
  return (
    <div
      id='canvas'
      className='flex h-fit min-h-screen w-full flex-col items-center bg-base-300 bg-[url("/src/assets/home-hero.webp")] bg-cover bg-top pb-8 md:pb-0'
    >
      {children}
    </div>
  );
}
