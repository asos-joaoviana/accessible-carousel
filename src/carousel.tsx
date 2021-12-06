import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SlideDirection } from "./carousel.interface";

export const Carousel = () => {
  const slides = [
    {
      title: "Dog",
      text: "They are great",
      img: "https://loremflickr.com/320/240/dog",
      alt: "Photo of a dog",
    },
    {
      title: "Cat",
      text: "They are quiet",
      img: "https://loremflickr.com/320/240/kitten",
      alt: "Photo of a cat",
    },
    {
      title: "Bird",
      text: "They love to tweet",
      img: "https://loremflickr.com/320/240/bird",
      alt: "Photo of a bird",
    },
    {
      title: "Fish",
      text: "They love to glub",
      img: "https://loremflickr.com/320/240/fish",
      alt: "Photo of a fish",
    },
  ];

  const carouselRef = useRef<HTMLUListElement>(null);

  const [translateXPercentage, setTranslateXPercentage] = useState(0);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    setTranslateXPercentage(activeSlideIndex * -100);
  }, [activeSlideIndex]);

  useLayoutEffect(() => {
    if (hasChanged) {
      setTimeout(
        () => document.getElementById("carousel-item-active")?.focus(),
        100
      );
    }
  }, [hasChanged, activeSlideIndex]);

  const slide = (
    slideDirection: SlideDirection.Previous | SlideDirection.Next
  ) => {
    setHasChanged(true);
    setActiveSlideIndex(
      activeSlideIndex + (slideDirection === SlideDirection.Next ? 1 : -1)
    );
  };

  const slideToSlide = (idx: number) => {
    setHasChanged(true);
    setActiveSlideIndex(idx);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-labelledby="my-title"
      style={{ width: "70vw", margin: "auto" }}
    >
      <h1 id="my-title">Photo slideshow</h1>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => slide(SlideDirection.Previous)}
          aria-label="previous slide"
          style={{ cursor: "pointer" }}
          disabled={activeSlideIndex === 0}
        >
          {"<"}
        </button>
        <div style={{ width: "100%", overflow: "hidden" }}>
          <ul
           role="group"
            aria-atomic="false"
            aria-live="polite"
            ref={carouselRef}
            aria-label="mylabel"
            style={{
              display: "flex",
              margin: "0px",
              padding: "0px",
              listStyleType: "none",
              transform: `translateX(${translateXPercentage}%)`,
            }}
          >
            {slides.map(({ title, text, img, alt }, idx) => (
              <li
                tabIndex={activeSlideIndex === idx ? 0 : -1}
                id={
                  activeSlideIndex === idx
                    ? "carousel-item-active"
                    : "carousel-item"
                }
                aria-roledescription="slide"
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flex: "1 0 100%",
                  flexBasis: "100%",
                }}
                aria-hidden={activeSlideIndex !== idx}
                aria-current={activeSlideIndex === idx}
              >
                <div style={{ width: "90%" }}>
                  <h3 style={{ marginTop: "0px" }} >{title}</h3>
                  <p>{text}</p>
                  <img src={img} alt={alt} style={{ width: "100%" }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => slide(SlideDirection.Next)}
          disabled={activeSlideIndex === slides.length - 1}
          aria-label="next slide"
          style={{ cursor: "pointer" }}
        >
          {">"}
        </button>
      </div>

      <div
        role="tablist"
        aria-label="Slides"
        style={{
          marginTop: "10px",
          display: "flex",
          gap: "5px",
          justifyContent: "center",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        {slides.map(({ title }, idx) => (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-label={`Slide ${idx +1}`}
            onClick={() => slideToSlide(idx)}
            style={{
              background: "none",
              borderRadius: "50%",
              width: "10px",
              height: "10px",
              padding: "0px",
              cursor: "pointer",
              backgroundColor: activeSlideIndex === idx ? "lightblue" : "white",
            }}
          >
            <span className="visuallyhidden">{title}</span>
          </button>
        ))}
      </div>

      <div aria-live="polite" aria-atomic="true" className="visuallyhidden">
        <span>{`Item ${activeSlideIndex + 1} of ${slides.length}`}</span>
      </div>
    </section>
  );
};
