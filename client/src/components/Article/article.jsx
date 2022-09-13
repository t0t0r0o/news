import React  from 'react';
import './article.css';


const  Article = (props) => {
  return (
    <>
      <article>
        <h3 title={props.title}><a href={props.link}>{props.title}</a></h3>
        <div className="aritcle-section">
          {
            props.thumb && (<img src={props.thumb} alt={props.title} />)
          }
          <p>{props.desc}</p>
        </div>
      </article>
      <hr />
    </>
  );
}

export default Article;
