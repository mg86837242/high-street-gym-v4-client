import { useRef } from 'react';
import carouselItems from '../../data/carouselItems';

export default function Carousel() {
  const listRef = useRef(null);

  function scrollToIndex(index) {
    const listNode = listRef.current;
    const slideNode = listNode.querySelectorAll('li')[index];
    slideNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }

  return (
    <ul ref={listRef} className='carousel h-[80vh] w-full'>
      {carouselItems.map(({ id, imageUrl, activityName }) => (
        <li id={`slide-${id + 1}`} key={id} className='carousel-item relative w-full'>
          <div id={`slide-${id + 1}-content-wrapper`} className='grid grid-cols-2 place-items-center'>
            <img
              src={imageUrl}
              alt={`${activityName.toLowerCase()} activities`}
              className='duration-5000 col-span-2 h-full w-full rounded-3xl object-cover object-center grayscale transition-all hover:rounded-md lg:col-span-1'
            />
            <div className='col-span-2 p-4 text-center lg:col-span-1 lg:p-6'>
              <h2 className='mb-6'>{`${activityName.replace('-', ' ')} Activities`}</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem est cupiditate suscipit non ipsa
                voluptatibus error culpa debitis quaerat. Incidunt?
              </p>
            </div>
          </div>
          <div
            id={`slide-${id + 1}-nav-buttons`}
            className='absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between'
          >
            <button
              onClick={() => scrollToIndex(id - 1 < 0 ? carouselItems.length - 1 : id - 1)}
              className='btn-circle btn'
            >
              ❮
            </button>
            <button
              onClick={() => scrollToIndex(id + 2 > carouselItems.length ? 0 : id + 1)}
              className='btn-circle btn'
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
