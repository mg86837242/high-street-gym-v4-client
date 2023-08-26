import { LazyLoadImage } from 'react-lazy-load-image-component';

import imgUrl from '../../assets/home-hero.webp';

export default function Hero({ children }) {
  return (
    <div id='hero-1-wrapper' className='grid grid-cols-1 grid-rows-1'>
      <LazyLoadImage
        src={imgUrl}
        alt='Hero image showing gym facilities'
        className='col-[1_/_2] row-[1_/_2] h-screen w-full object-cover object-top'
      />
      {children}
      <div id='hero-1-content-wrapper' className='col-[1_/_2] row-[1_/_2] grid grid-cols-10 grid-rows-6'>
        <h1 className='animate pop col-start-2 col-end-10 row-[2_/_4] self-end justify-self-start bg-[#191d24]/50 p-1 tracking-wide md:col-end-8'>
          High Street Gym
        </h1>
        <p className='animate pop delay-1 col-start-2 col-end-10 row-[4_/_6] self-start justify-self-start bg-[#191d24]/50 p-1 text-primary-content md:col-end-7 xl:col-end-6'>
          Lorem ipsum dolor sit, amet consectetur akipisicing elit. Inventore labore delectus quisquam id sed voluptate
          perspiciatis illum exercitationem facilis esse odit, dignissimos recusandae velit dolores sint sit a eveniet
          officiis.
        </p>
      </div>
    </div>
  );
}

// References:
// -- https://dev.to/vanaf1979/css-grid-stacking-elements-55me: Stacking elements for hero section
