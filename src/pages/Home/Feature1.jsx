export default function Feature({ children }) {
  return (
    <div id='feature-1-wrapper' className='flex w-full flex-col items-center justify-center gap-10'>
      <h1 className='w-full max-w-screen-2xl text-center text-secondary'>
        We offer a variety range of group exercise sessions
      </h1>
      <p className='w-full max-w-screen-2xl text-center'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea minima, veritatis repellendus perspiciatis
        consequuntur impedit eos, sapiente reiciendis unde, corrupti excepturi. Modi quam dignissimos dolor,
        necessitatibus asperiores voluptas quo error, alias expedita voluptatibus iure neque aliquid aut? Quisquam,
        similique. Dolorum eaque officiis aripisci similique, eos assumenda maiores consectetur repellendus! Debitis.
      </p>
      {children}
    </div>
  );
}
