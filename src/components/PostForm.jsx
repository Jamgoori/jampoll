// 필요한 도구를 불러옵니다.
import { useState } from "react";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {ref, uploadBytes} from 'firebase/storage'
import {v4} from 'uuid';
const PostForm = () => {
  const [newTitle, setNewTitle] = useState(""); 
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
    await setDoc(newTitleDocRef, newPost);

    // 입력한 서브컬렉션 ID로 서브컬렉션 문서를 생성
    const subcollectionRef = collection(newTitleDocRef, newSubcollectionId);
    const subcollectionDocRef = doc(subcollectionRef);

    // 필드를 서브컬렉션 문서에 추가합니다.
    const subcollectionData = {};
    fieldList.forEach(({ fieldName }, index) => {
      subcollectionData[fieldName] = index;
    });
    await setDoc(subcollectionDocRef, subcollectionData);

    // 입력 필드 초기화
    setNewTitle("");
    setNewSubcollectionId("");
    setFieldList([{ fieldName: "" }]);
  };



  const uploadImage = () =>{
    if (imageUpload == null) return;
    // 이미지 아이디 랜덤생성
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(()=> {
      alert("이미지가 업로드 되었습니다.")
    })
  }
  const [imageUpload, setImageUpload] = useState(null)

  function realPost(){
    createTitle();
    uploadImage();
  }
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
        value={newSubcollectionId}
        onChange={(e) => {
          setNewSubcollectionId(e.target.value);
        }}
      />
      {fieldList.map((field, index) => (
        <div key={index}>
          <input
            placeholder="투표안건 1"
            value={field.fieldName}
            onChange={(e) => handleFieldChange(index, "fieldName", e.target.value)}
          />
          
      <input type="file" onChange={(e)=>{setImageUpload(e.target.files[0])}}/>
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
