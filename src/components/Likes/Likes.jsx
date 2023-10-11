import React, { useState, useEffect } from "react";
import "./Likes.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { auth, db } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  query,
  getDocs,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Likes({ articleId }) {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const [user] = useAuthState(auth);

  // check if user has already liked article to show proper icon
  useEffect(() => {
    const likesRef = collection(db, "likes");
    // make sure a user is logged in
    if (user) {
      // setup query to find if id of article liked
      const q = query(
        likesRef,
        where("articleId", "==", articleId),
        where("userId", "==", user?.uid)
      );

      // get match
      getDocs(q, likesRef)
        .then((res) => {
          if (res.size > 0) {
            setIsLiked(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    // make a query to count likes
    const likesRef = collection(db, "likes");

    const q2 = query(likesRef, where("articleId", "==", articleId));

    // look for matching documents
    getDocs(q2, likesRef)
      .then((res) => {
        setLikeCount(res.size);
      })
      .catch((err) => console.log(err));
  }, [isLiked]);

  const handleLikes = (e) => {
    // console.log("like");
    // make sure a user is logged in
    if (user) {
      // console.log("userId", user?.uid)
      // console.log("articleId", articleId)

      // create reference to likes collection
      // will create the collection for first time
      const likesRef = collection(db, "likes");

      // adding a document with this articleId and userId
      addDoc(likesRef, {
        userId: user?.uid,
        articleId: articleId,
      })
        .then((res) => {
          // don't need response
          // change heart icon to a closed heart
          setIsLiked(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUnlike = (e) => {
    // make sure a user is logged in
    if (user) {
      // need to find document with this userId and articleId to retrieve document id
      const likesRef = collection(db, "likes");

      // setup query to find id of article to unlike
      const q = query(
        likesRef,
        where("articleId", "==", articleId),
        where("userId", "==", user?.uid)
      );

      // get match
      getDocs(q, likesRef)
        .then((res) => {
          // console.log(res.size);
          // console.log(res.docs[0].id)
          const likesId = res.docs[0].id;

          //now delete this doc from likes collection
          deleteDoc(doc(db, "likes", likesId))
            .then((res) => setIsLiked(false))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      {isLiked ? (
        <FaHeart onClick={handleUnlike} />
      ) : (
        <FaRegHeart onClick={handleLikes} />
      )}
      <span>
        {""}
        {likeCount}
      </span>
    </div>
  );
}

export default Likes;
