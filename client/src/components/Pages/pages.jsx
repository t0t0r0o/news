import React  from 'react';
import './pages.css';


const  Pages = (props) => {
  return (
    <>
      <article>
        <h3 title={props.title}><a href={props.link}>{props.title}</a></h3>
        <div className="aritcle-section">
          <img src={props.thumb} alt={props.title} />
          <p>{props.desc}</p>
        </div>
      </article>
      <hr />
    </>
  );
}

export default Article;
