import { useRef } from 'react';

import carouselItems from '../../data/carouselItems';

export default function Carousel1() {
  const slideListRef = useRef(null);

  function scrollToIndex(index) {
    const slideListNode = slideListRef.current;
    const slideNode = slideListNode.querySelectorAll('li')[index];
    slideNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }

  return (
    <ul ref={slideListRef} className='carousel w-full'>
      {carouselItems.map(({ id, imageUrl, activityName }) => (
        <li id={`slide-${id + 1}`} key={id} className='carousel-item relative w-full'>
          <div
            id={`slide-${id + 1}-content-wrapper`}
            className='flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-0'
          >
            <img
              src={imageUrl}
              alt={`${activityName.toLowerCase()} activities`}
              className='duration-5000 h-full w-full rounded-md object-cover object-center transition-all  lg:w-1/2 lg:rounded-3xl'
            />
            <div className='text-center lg:w-1/2 lg:p-6'>
              <h2 className='mb-6'>{`${activityName.replace('-', ' ')} Activities`}</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem est cupiditate suscipit non ipsa
                voluptatibus error culpa debitis quaerat. Incidunt?
              </p>
            </div>
          </div>
          <div
            id={`slide-${id + 1}-nav-button-group`}
            className='absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between'
          >
            <button
              onClick={() => scrollToIndex(id - 1 < 0 ? carouselItems.length - 1 : id - 1)}
              className='btn btn-circle'
            >
              ❮
            </button>
            <button
              onClick={() => scrollToIndex(id + 2 > carouselItems.length ? 0 : id + 1)}
              className='btn btn-circle'
            >
              ❯
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

// References: https://daisyui.com/components/carousel/
