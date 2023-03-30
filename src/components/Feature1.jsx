export default function Feature({ children }) {
  return (
    <div id='feature-1-wrapper' className='grid w-full gap-10 place-items-center'>
      <h1 className='w-full text-center text-secondary max-w-screen-2xl'>
        We offer a variety range of group exercise sessions
      </h1>
      <p className='w-full text-center max-w-screen-2xl'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea minima, veritatis repellendus perspiciatis
        consequuntur impedit eos, sapiente reiciendis unde, corrupti excepturi. Modi quam dignissimos dolor,
        necessitatibus asperiores voluptas quo error, alias expedita voluptatibus iure neque aliquid aut? Quisquam,
        similique. Dolorum eaque officiis aripisci similique, eos assumenda maiores consectetur repellendus! Debitis.
      </p>
      {children}
    </div>
  );
}
