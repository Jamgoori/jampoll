import { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
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
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/")

  useEffect(()=>{
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url])
        })
      })
    })
  }, [])

  return (
    <div>
    {title.map((titleItem) => {
      return (
        <div key={titleItem.id}>
          <div>제목: {titleItem.title}</div>
          <div>토의: {titleItem.dscuss1}</div>
          <button onClick={() => { updateTitle(titleItem.id, titleItem.title) }}>제목 변경하기</button>
          <button onClick={() => { deleteTitle(titleItem.id) }}>글 삭제하기</button>

          <div>
            {imageList.map((url, index) => {
              return <img key={index} src={url} className='pollImg' />;
            })}
          </div>
        </div>
      );
    })}

    </div>
  );
};

export default PostList;
