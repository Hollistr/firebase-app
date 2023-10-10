import React, { useEffect, useState } from "react";
import "./CategoryArticle.css";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import ArticleCard from "../../components/ArticleCard/ArticleCard";

function CategoryArticle() {
  const { categoryName } = useParams();

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // create a reference to firestore db articles collection
    const articlesRef = collection(db, "articles");

    // now get the data that matches the category
    const q = query(articlesRef, where("category", "==", categoryName));

    // now get data that matches the query
    getDocs(q, articlesRef).then((res) => {
      const articles = res.docs.map((item) => {
        return {
          ...item.data(),
          id: item.id,
        };
      });
      // console.log(articles)
      setArticles(articles);
    });
  }, [categoryName]);

  return (
    <div className="category-articles">
      {articles.map((item) => (
        <ArticleCard article={item} />
      ))}
    </div>
  );
}

export default CategoryArticle;
