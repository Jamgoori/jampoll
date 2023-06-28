import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const PostForm = () => {
  const [newTitle, setNewTitle] = useState("");
  const titleCollectionRef = collection(db, "board");

  const createTitle = async () => {
    const newPost = {
      title: newTitle,
      createdat: serverTimestamp(), // 현재 시간의 타임스탬프를 저장
    };

    await addDoc(titleCollectionRef, newPost);
    setNewTitle(""); // 글 작성 후 제목 입력 필드를 초기화
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
      <button onClick={createTitle}>글 쓰기</button>
    </div>
  );
};

export default PostForm;
