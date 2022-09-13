import React from "react";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import "./banner.css";

function Banner(props) {
  const [current, setCurrent] = useState(0);
  const articlesHot = props.articles;
  const length = 6;
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(articlesHot) || articlesHot.length <= 0) {
    return null;
  }

  // setInterval(() => {
  //   if(current < length) {
  //     nextSlide();
  //   } else {
  //     setCurrent(0);
  //   }
  // }, 5000);

  return (
    <div className="banner">
      <div className="left">
        <FiArrowLeft className="left-arrow" onClick={prevSlide} />
        <FiArrowRight className="right-arrow" onClick={nextSlide} />
        {articlesHot.slice(0,6).map((article, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <div className="article-hot">
                  <img
                    src={article.thumb}
                    alt={article.title}
                    className="background"
                  />
                  <div className="name">
                    <h3 className="title">
                      {" "}
                      <a href={article.link}>{article.title}</a>
                    </h3>
                    <p className="desc">{article.desc}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="right">
        <div className="weather"></div>
        <div className="something"></div>
      </div>
    </div>
  );
}

export default Banner;
