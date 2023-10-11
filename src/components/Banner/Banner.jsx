import React, { useEffect, useState } from "react";
import "./Banner.css";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

function Banner() {
  const [mainArticle, setMainArticle] = useState({});
  const [otherArticles, setOtherArticles] = useState([]);

  const navigate = useNavigate();

  // get data when banner loads
  useEffect(() => {
    // created a variable to reference article collection
    const articlesRef = collection(db, "articles");

    // setup query to filter responses
    // sort and then get the first 5
    const q = query(articlesRef, orderBy("createdAt", "desc"), limit(5));

    // get articles from the db
    getDocs(q, articlesRef)
      .then((res) => {
        // console.log(res.docs[0].data());
        const articles = res.docs.map((item) => {
          return {
            ...item.data(),
            id: item.id,
          };
        });
        // console.log(articles);
        setMainArticle(articles[0]);
        setOtherArticles(articles.splice(1));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="banner-container">
      <div
        className="main-article-container"
        onClick={() => navigate(`/article/${mainArticle?.id}`)}
        key={mainArticle?.id}
        style={{ backgroundImage: `url(${mainArticle?.imageUrl})` }}
      >
        <div className="banner-info">
          <h2>{mainArticle?.title}</h2>
          <div className="main-article-info">
            <p>{mainArticle?.createdAt?.toDate().toDateString()}</p>
          </div>
        </div>
      </div>
      <div className="other-articles-container">
        {otherArticles.map((item) => {
          return (
            <div
              className="other-article-item"
              key={item.id}
              onClick={() => navigate(`/article/${item?.id}`)}
              style={{ backgroundImage: `url(${item?.imageUrl})` }}
            >
              <div className="banner-info">
                <h3>{item?.title}</h3>
                <div className="main-article-info">
                  <small>{item?.createdAt?.toDate().toDateString()}</small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Banner;
