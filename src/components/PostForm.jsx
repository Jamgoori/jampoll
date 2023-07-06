import { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const PostForm = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [fieldList, setFieldList] = useState([{ fieldName: "" }]);

  const handleFieldChange = (index, value) => {
    const updatedFieldList = [...fieldList];
    updatedFieldList[index] = { fieldName: value };
    setFieldList(updatedFieldList);
  };

  const handleAddField = () => {
    setFieldList([...fieldList, { fieldName: "" }]);
  };

  const createTitle = async () => {
    const newPost = {
      title: newTitle,
      content: newContent,
      createdat: serverTimestamp(),
    };

    const boardCollectionRef = collection(db, "board");
    const newTitleDocRef = doc(boardCollectionRef);

    // 게시물 제목 저장
    await setDoc(newTitleDocRef, newPost);

    const subcollectionRef = collection(newTitleDocRef, "question");

    // 투표안건을 문서로 생성하고 각 문서에 값을 저장
    for (let i = 0; i < fieldList.length; i++) {
      const fieldName = fieldList[i].fieldName;
      const subcollectionDocRef = doc(subcollectionRef, fieldName);
      await setDoc(subcollectionDocRef, { fieldName });
    }

    // 입력 필드 초기화
    setNewTitle("");
    setNewContent("");
    setFieldList([{ fieldName: "" }]);
  };

  const uploadImage = async (image) => {
    const storage = getStorage();
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    await uploadBytes(imageRef, image);
    alert("이미지가 업로드 되었습니다.");
  };

  const [imageUpload, setImageUpload] = useState(null);

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
        <input
          type="file"
          onChange={(e) => setImageUpload(e.target.files[0])}
        />
        <button onClick={handleAddField}>필드 추가</button>
        <button onClick={realPost}>글 작성</button>
      </div>
    </div>
  );
};

export default PostForm;
