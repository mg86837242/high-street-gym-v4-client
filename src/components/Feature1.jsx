export default function Feature({ children }) {
  return (
    <div id='feature-1-wrapper' className='grid place-items-center gap-10 w-full'>
      <h1 className='text-secondary text-center w-full lg:w-4/5'>
        We offer a variety range of group exercise sessions
      </h1>
      <p className='text-center w-full lg:w-4/5'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea minima, veritatis repellendus perspiciatis
        consequuntur impedit eos, sapiente reiciendis unde, corrupti excepturi. Modi quam dignissimos dolor,
        necessitatibus asperiores voluptas quo error, alias expedita voluptatibus iure neque aliquid aut? Quisquam,
        similique. Dolorum eaque officiis aripisci similique, eos assumenda maiores consectetur repellendus! Debitis.
      </p>
      {children}
    </div>
  );
}
