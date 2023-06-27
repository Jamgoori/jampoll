import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const PostList = () => {
  const [title, setTitle] = useState([]);
  const titleCollectionRef = collection(db, "board");

  const getTitle = async () => {
    const data = await getDocs(titleCollectionRef);
    setTitle(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


  // 글수정하기
  const updateTitle = async (id, title) => {
    const titleDoc = doc(db, "board", id);
    const newFields = { title: title + "변경됨" };
    await updateDoc(titleDoc, newFields);
    getTitle(); // 업데이트 후 데이터 갱신
  };

  const deleteTitle = async(id) => {
    const titleDoc = doc(db, "board", id);
    await deleteDoc(titleDoc);
    getTitle(); // 업데이트 후 데이터 갱신
  }

  useEffect(() => {
    getTitle(); // 초기 데이터 가져오기
  }, []);

  return (
    <div>
      {title.map((title) => {
        return (
          <>
            <div>제목: {title.title}</div>
            <div>토의: {title.dscuss1}</div>
            <button onClick={() => { updateTitle(title.id, title.title) }}>제목 변경하기</button>
            <button onClick={() => {deleteTitle(title.id)}}>글 삭제하기</button>
          </>
        );
      })}
    </div>
  );
};

export default PostList;
