import { useState } from "react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const PostForm = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newSubcollection, setNewSubcollection] = useState("");

  const createTitle = async () => {
    const newPost = {
      title: newTitle,
      createdat: serverTimestamp(),
      subcollection: newSubcollection,
    };

    const boardCollectionRef = collection(db, "board");
    const newTitleDocRef = doc(boardCollectionRef);

    await setDoc(newTitleDocRef, newPost);
    setNewTitle("");
    setNewSubcollection("");
  };

  return (
    <div className="ddd">
      <input
        className="width100"
        placeholder="제목"
        value={newTitle}
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
      />
      <input
        className="width100"
        placeholder="서브컬렉션"
        value={newSubcollection}
        onChange={(e) => {
          setNewSubcollection(e.target.value);
        }}
      />
      <button onClick={createTitle}>글 쓰기</button>
    </div>
  );
};

export default PostForm;
