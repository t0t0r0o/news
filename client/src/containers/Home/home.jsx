import React, { useEffect, useState } from "react";
import $ from "jquery"
import "./home.css";
import Banner from "../../layouts/Banner/banner";
import Navbar from "../../layouts/Navbar/navbar";
import Article from "../../components/Article/article";
// import io from "socket.io-client";

// const socket = io("http://127.0.0.1:8080");

const Home = () => {
  const hotArray = [];
  const normalArray = [];
  const newArray = [];
  const [articles, setArticle] = useState([]);


  // get data bang jquery
  const getData = async () => {
    $.ajax({
      type: "GET",
      url: "http://127.0.0.1:8080/databases/",
      timeout: "30000",
      success: (data) => setArticle(data),
      error: (e) => console.log(e)  
    })
  };

  // get data bang fetch data
  // const getData = async () => {
  //   try {
  //     fetch("http://127.0.0.1:8080/databases")
  //       .then((response) => response.json())
  //       .then((data) => setArticle(data));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  useEffect(() => {
    getData();
    const intervalCall = setInterval(() => {
      getData();
    }, 30000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, []);
  function checkNews() {
    console.log(articles);
    articles.forEach((domain) => {
      domain.articles.forEach((article) => {
        if (article.newUpdate === true) {
          newArray.push(article);
        }
        if (article.category === "hot") {
          hotArray.push(article);
        } else {
          normalArray.push(article);
        }
      });
    });
  }
  // useEffect(
  //   () => {
  //     socket.on("connection", (arg) => {
  //       console.log("cap nhat du lieu");
  //       console.log(arg);
  //       setArticle(arg);
  //     });
  //   },
  //   [articles]);
  checkNews();
  console.log(articles);

  console.log(newArray);
  return (
    <div className="App">
      <Navbar />
      <Banner articles={newArray} />
      <div className="container">
        <div className="left-2">
          {hotArray.map((article, index) => {
            return (
              <Article
                key={index}
                link={article.link}
                desc={article.desc}
                title={article.title}
                thumb={article.thumb}
              />
            );
          })}
        </div>
        <div className="right-2">
          {normalArray.map((article, index) => {
            return (
              <Article
                key={index}
                link={article.link}
                desc={article.desc}
                thumb={article.thumb}
                title={article.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
