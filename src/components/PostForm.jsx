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
  const [newSubcollectionId, setNewSubcollectionId] = useState("");
  const [fieldList, setFieldList] = useState([{ fieldName: "" }]);

  const handleFieldChange = (index, field, value) => {
    const updatedFieldList = [...fieldList];
    updatedFieldList[index] = { ...updatedFieldList[index], [field]: value };
    setFieldList(updatedFieldList);
  };

  const handleAddField = () => {
    setFieldList([...fieldList, { fieldName: "" }]);
  };

  const createTitle = async () => {
    const newPost = {
      title: newTitle,
      createdat: serverTimestamp(),
    };

    const boardCollectionRef = collection(db, "board");
    const newTitleDocRef = doc(boardCollectionRef);

    const newTitleDoc = await setDoc(newTitleDocRef, newPost);

    const subcollectionRef = collection(newTitleDocRef, newSubcollectionId);
    const subcollectionDocRef = doc(subcollectionRef);

    const subcollectionData = {};
    fieldList.forEach(({ fieldName }, index) => {
      subcollectionData[fieldName] = index;
    });

    await setDoc(subcollectionDocRef, subcollectionData);

    setNewTitle("");
    setNewSubcollection("");
    setNewSubcollectionId("");
    setFieldList([{ fieldName: "" }]);
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
        placeholder="서브컬렉션 ID"
        value={newSubcollectionId}
        onChange={(e) => {
          setNewSubcollectionId(e.target.value);
        }}
      />
      {fieldList.map((field, index) => (
        <div key={index}>
          <input
            className="width100"
            placeholder="필드명"
            value={field.fieldName}
            onChange={(e) => handleFieldChange(index, "fieldName", e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleAddField}>필드 추가</button>
      <button onClick={createTitle}>글 쓰기</button>
    </div>
  );
};

export default PostForm;
