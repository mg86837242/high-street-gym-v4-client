import { useRef } from "react";
import carouselItems from "../data/carouselItems";

export default function Carousel2() {
  const listRef = useRef(null);

  function scrollToIndex(index) {
    const listNode = listRef.current;
    const slideNode = listNode.querySelectorAll("li")[index];
    slideNode.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <ul ref={listRef} className="carousel w-full h-[80vh]">
      {carouselItems.map(({ imageUrl, activityName }, i) => (
        <li id={`slide-${i + 1}`} key={i} className="carousel-item relative w-full">
          <div id={`slide-${i + 1}-content-wrapper`} className="grid grid-cols-2 place-items-center">
            <img
              src={imageUrl}
              alt={`${activityName.toLowerCase()} activities`}
              className="col-span-2 lg:col-span-1 w-full h-full object-cover object-center rounded-3xl transition-all duration-5000 hover:rounded-md grayscale"
            />
            <div className="col-span-2 lg:col-span-1 text-center p-4 lg:p-6">
              <h2 className="mb-6">{`${activityName.replace("-", " ")} Activities`}</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem est cupiditate suscipit non ipsa voluptatibus error culpa debitis
                quaerat. Incidunt?
              </p>
            </div>
          </div>
          <div id={`slide-${i + 1}-nav-buttons`} className="absolute flex justify-between -translate-y-1/2 left-5 right-5 top-1/2">
            <button onClick={() => scrollToIndex(i - 1 < 0 ? carouselItems.length - 1 : i - 1)} className="btn btn-circle">
              ❮
            </button>
            <button onClick={() => scrollToIndex(i + 2 > carouselItems.length ? 0 : i + 1)} className="btn btn-circle">
              ❯
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

// References: https://daisyui.com/components/carousel/
