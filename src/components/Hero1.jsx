export default function Hero1({ children }) {
  return (
    <div id="hero-1-wrapper" className="grid grid-rows-1 grid-cols-1">
      <img
        src="src/assets/home-hero.webp"
        alt="Hero image showing gym facilities"
        className="row-[1_/_2] col-[1_/_2] object-cover object-top w-full h-screen"
      />
      {children}
      <div id="hero-1-content-wrapper" className="grid grid-cols-10 grid-rows-6 row-[1_/_2] col-[1_/_2]">
        <h1 className="col-start-2 col-end-10 md:col-end-8 row-[2_/_4] justify-self-start self-end bg-[#191d24]/50 p-1 tracking-wide animate pop">
          High Street Gym
        </h1>
        <p className="col-start-2 col-end-10 md:col-end-7 xl:col-end-6 row-[4_/_6] justify-self-start self-start bg-[#191d24]/50 p-1 text-primary-content animate pop delay-1">
          Lorem ipsum dolor sit, amet consectetur akipisicing elit. Inventore labore delectus quisquam id sed voluptate perspiciatis illum
          exercitationem facilis esse odit, dignissimos recusandae velit dolores sint sit a eveniet officiis.
        </p>
      </div>
    </div>
  );
}

// References:
// -- https://dev.to/vanaf1979/css-grid-stacking-elements-55me: Stacking elements for hero section
