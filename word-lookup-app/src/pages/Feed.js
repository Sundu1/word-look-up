import React, { useRef, useEffect, useState, createRef } from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import * as hero1 from "../images/heroImageSlide1.jpg";
import * as hero2 from "../images/heroimageSlide2.jpg";

const Feed = () => {
  const arr = [hero1.default, hero2.default];
  const arrLength = arr.length;
  const elRefs = useRef([]);

  if (elRefs.current.length !== arrLength) {
    elRefs.current = Array(arrLength)
      .fill()
      .map((_, i) => elRefs.current[i] || createRef());
  }

  const [curSlide, setCurslide] = useState(0);
  const maxSlides = elRefs.current.length;

  const nextSlide = () => {
    if (curSlide === maxSlides - 1) {
      setCurslide(0);
      return;
    }
    setCurslide(curSlide + 1);
  };

  const prevSlide = () => {
    if (curSlide <= 0) {
      setCurslide(maxSlides - 1);
      return;
    }
    setCurslide(curSlide - 1);
  };

  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return (
    <>
      <div className="flex justify-center">
        <div>
          <div
            className="relative w-[70em] bg-gray-200 h-[350px] flex justify-center
                         content-center overflow-hidden transition"
          >
            {arr.map((img, i) => {
              return (
                <div
                  key={i}
                  className="absolute w-full text-center text-black duration-1000"
                  ref={elRefs.current[i]}
                  style={{ transform: `translateX(${100 * (i - curSlide)}%)` }}
                >
                  <img src={img} />
                </div>
              );
            })}
            <button
              className="absolute top-[40%] left-[2%] text-[50px] text-gray-700 hover:text-gray-500"
              onClick={prevSlide}
            >
              <BiLeftArrow />
            </button>
            <button
              className="absolute top-[40%] right-[2%] text-[50px] text-gray-700 hover:text-gray-500"
              onClick={nextSlide}
            >
              <BiRightArrow />
            </button>
          </div>
          <div
            className="flex justify-center h-[400px] p-5 mt-[100px]"
            ref={containerRef}
          >
            {isVisible ? (
              <div className="section1_slidein">
                <div className="flex pt-11 border-2 p-2 h-[20em] w-[60em] rounded-3xl bg-gray-100">
                  <div className="m-[20px] w-[25em]"></div>
                  <div className="m-[20px]">
                    Make new notes so that you will never forget your groceries
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
