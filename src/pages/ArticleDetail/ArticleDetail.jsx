import React, { useEffect, useState } from "react";
import "./ArticleDetail.css";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import Likes from "../../components/Likes/Likes";
import Comments from "../../components/Comments/Comments";

function ArticleDetail() {
  const [article, setArticle] = useState({});

  const { articleId } = useParams();

  // need to get details for article from db
  useEffect(() => {
    // setup a reference to a single doc with the articleId
    const docRef = doc(db, "articles", articleId);

    getDoc(docRef).then((res) => {
      // console.log(res.data());
      setArticle(res.data());
    });
  }, []);

  return <div className="details-container">
    <h1>{article?.title}</h1>
    <h2>{article?.summary}</h2>
    <div className="details-info-container">
        <p><span className="article-span">Category: </span> {article?.category}</p>
        <p><span className="article-span">Author: </span>{article?.createdBy}</p>
        <p><span className="article-span">Published: </span>{article?.createdAt?.toDate().toDateString()}</p>
        <Likes articleId={articleId}/>
    </div>
    <div className="details-content">
        <img src={article?.imageUrl} className="details-img" />
        <p className="article-description">{article?.ParagraghOne}</p>
        <p className="article-description">{article?.ParagraghTwo}</p>
        <p className="article-description">{article?.ParagraghThree}</p>
      </div>
      <Comments articleId={articleId}/>
  </div>;
}

export default ArticleDetail;
