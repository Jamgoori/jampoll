import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const PostList = () => {
  const [title, setTitle] = useState([]);
  const titleCollectionRef = collection(db, "board");

  const getTitle = async () => {
    const data = await getDocs(titleCollectionRef);
    setTitle(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const updateTitle = async (id, title) => {
    const titleDoc = doc(db, "board", id);
    const newFields = { title: title + "변경됨" };
    await updateDoc(titleDoc, newFields);
    getTitle();
  };

  const deleteTitle = async (id) => {
    const titleDoc = doc(db, "board", id);
    await deleteDoc(titleDoc);
    getTitle();
  };

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "board"), orderBy("title", "desc"));
      const querySnapshot = await getDocs(q);
      setTitle(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchData();
  }, []);

  return (
    <div className="ddd">
      {title.map((title) => {
        return (
          <div key={title.id}>
            <div>제목: {title.title}</div>
            <div>토의: {title.discuss1}</div>
            <div className="flex">
              <button>글수정하기</button>
              <button
                onClick={() => {
                  updateTitle(title.id, title.title);
                }}
              >
                제목 변경하기
              </button>
            </div>
            <button
              onClick={() => {
                deleteTitle(title.id);
              }}
            >
              글 삭제하기
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
