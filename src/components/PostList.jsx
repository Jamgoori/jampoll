import { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { getDownloadURL, listAll, ref } from 'firebase/storage';

const PostList = () => {
  const [title, setTitle] = useState([]);
  const titleCollectionRef = collection(db, "board");

  const getTitle = async () => {
    const data = await getDocs(titleCollectionRef);
    const titles = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  
    const pollItemsData = [];
    for (const title of titles) {
      const subcollectionRef = collection(doc(titleCollectionRef, title.id), "question");
      const subcollectionData = await getDocs(subcollectionRef);
      const pollItems = subcollectionData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      pollItemsData.push({ ...title, pollItems });
    }
  
    setPollItems(pollItemsData);
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
    getTitle();
  }, []);

  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/");

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const [pollItems, setPollItems] = useState([]);

  return (
    <div>
      {pollItems.map((titleItem) => {
        return (
          <div key={titleItem.id}>
            <div>제목: {titleItem.title}</div>
            <div>투표설명: {titleItem.content}</div>
            <div className='moonsue'>
              {titleItem.pollItems.map((pollItem) => (
                <div key={pollItem.id}>투표안건 문서 ID: {pollItem.id}</div>
              ))}
            </div>
            <button onClick={() => { updateTitle(titleItem.id, titleItem.title) }}>제목 변경하기</button>
            <button onClick={() => { deleteTitle(titleItem.id) }}>글 삭제하기</button>


          </div>
        );
      })}
    </div>
  );
};

export default PostList;
