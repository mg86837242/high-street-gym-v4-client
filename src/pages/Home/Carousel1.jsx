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
    <ul ref={slideListRef} className='carousel h-[80vh] w-full'>
      {carouselItems.map(({ id, imageUrl, activityName }) => (
        <li id={`slide-${id + 1}`} key={id} className='carousel-item relative w-full'>
          <div
            id={`slide-${id + 1}-content-wrapper`}
            className='grid grid-cols-1 grid-rows-2 place-items-center lg:grid-cols-2 lg:grid-rows-1'
          >
            <img
              src={imageUrl}
              alt={`${activityName.toLowerCase()} activities`}
              className='duration-5000 row-[2_/_3] h-full w-full rounded-md object-cover object-center transition-all lg:col-[1_/_2] lg:row-[1_/_2] lg:rounded-3xl'
            />
            <div className='row-[1_/_2] p-4 text-center lg:col-[2_/_3] lg:row-[1_/_2] lg:p-6'>
              <h2 className='mb-6'>{`${activityName.replace('-', ' ')} Activities`}</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem est cupiditate suscipit non ipsa
                voluptatibus error culpa debitis quaerat. Incidunt?
              </p>
            </div>
          </div>
          <div
            id={`slide-${id + 1}-nav-button-pair`}
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
