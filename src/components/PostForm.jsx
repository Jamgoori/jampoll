import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const PostForm = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [fieldList, setFieldList] = useState([{ fieldName: "" }]);
  const [submittedPosts, setSubmittedPosts] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);

  // 컴포넌트 마운트 시 데이터베이스에서 제출된 게시물 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      const boardCollectionRef = collection(db, "board");
      const snapshot = await getDocs(boardCollectionRef);
      const posts = snapshot.docs.map((doc) => doc.data());
      setSubmittedPosts(posts);
    };

    fetchPosts();
  }, []);

  // 필드 이름 업데이트
  const handleFieldChange = (index, value) => {
    const updatedFieldList = [...fieldList];
    updatedFieldList[index] = { fieldName: value };
    setFieldList(updatedFieldList);
  };

  // 새로운 필드 추가
  const handleAddField = () => {
    setFieldList([...fieldList, { fieldName: "" }]);
  };

  // 제목, 내용 및 생성일 타임스탬프를 포함한 새 게시물 생성
  const createTitle = async () => {
    const newPost = {
      title: newTitle,
      content: newContent,
      createdat: serverTimestamp(),
    };

    const boardCollectionRef = collection(db, "board");
    const newTitleDocRef = doc(boardCollectionRef);

    // "board" 컬렉션에 게시물 제목 저장
    await setDoc(newTitleDocRef, newPost);

    const subcollectionRef = collection(newTitleDocRef, "question");
    const answerSubcollectionRef = collection(newTitleDocRef, "answer");

    // 각 질문과 답변에 대한 문서 생성
    for (let i = 0; i < fieldList.length; i++) {
      // question
      const fieldName = fieldList[i].fieldName;
      const subcollectionDocRef = doc(subcollectionRef, fieldName);
      await setDoc(subcollectionDocRef, { fieldName });

      // answer
      const answerSubcollectionDocRef = doc(answerSubcollectionRef);
      await setDoc(answerSubcollectionDocRef, {});
    }

    // 입력 필드 초기화
    setNewTitle("");
    setNewContent("");
    setFieldList([{ fieldName: "" }]);
  };

  // 이미지 업로드
  const uploadImage = async (image) => {
    const storage = getStorage();
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    await uploadBytes(imageRef, image);
    alert("이미지가 업로드 되었습니다.");
  };

  const realPost = () => {
    createTitle();
    if (imageUpload) {
      uploadImage(imageUpload);
    }
  };

  return (
    <div>
      <input
        placeholder="투표제목"
        value={newTitle}
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
      />
      <input
        placeholder="투표설명"
        value={newContent}
        onChange={(e) => {
          setNewContent(e.target.value);
        }}
      />
      {fieldList.map((field, index) => (
        <div key={index}>
          <input
            placeholder={`투표안건 ${index + 1}`}
            value={field.fieldName}
            onChange={(e) => handleFieldChange(index, e.target.value)}
          />
        </div>
      ))}
      <div className="flex">
        <button onClick={handleAddField}>필드 추가</button>
        <button onClick={realPost}>글 작성</button>
      </div>
    </div>
  );
};

export default PostForm;
