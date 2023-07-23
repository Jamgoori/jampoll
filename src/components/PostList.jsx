import React, { useState, useEffect, useCallback } from "react";
import { db, storage } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { Button, CustomDiv, FlexDiv } from "./style/Container.style";
import auth from "../firebase";
const PostList = () => {
  const titleCollectionRef = collection(db, "board");
  const [answerData, setAnswerData] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false); // 버튼 클릭 여부 추적
  const [imageList, setImageList] = useState([]);
  const [pollItems, setPollItems] = useState([]); // Added setPollItems
  const [totalVotes, setTotalVotes] = useState(0);
  const imageListRef = ref(storage, "images/");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const MemoizedCustomDiv = React.memo(CustomDiv);
  useEffect(() => {
    const fetchTitleData = async () => {
      const data = await getDocs(titleCollectionRef);
      const titles = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const pollItemsData = [];
      const answerDataArray = []; // 답변 데이터를 담을 배열

      for (const title of titles) {
        const subcollectionRef = collection(
          doc(titleCollectionRef, title.id),
          "question"
        );
        const subcollectionData = await getDocs(subcollectionRef);
        const pollItems = subcollectionData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 각 pollItem에 대한 answer 데이터 가져오기
        const answerSubcollectionRef = collection(
          doc(titleCollectionRef, title.id),
          "answer"
        );
        const answerSubcollectionData = await getDocs(answerSubcollectionRef);
        const answerItems = answerSubcollectionData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        pollItemsData.push({ ...title, pollItems });
        answerDataArray.push(...answerItems);
      }

      setPollItems(pollItemsData);
      setAnswerData(answerDataArray); // 답변 데이터 상태 업데이트
    };
    // 이미지
    const fetchImageList = async () => {
      const response = await listAll(imageListRef);
      const imageUrls = await Promise.all(
        response.items.map((item) => getDownloadURL(item))
      );
      setImageList(imageUrls);
    };

    fetchTitleData();
    fetchImageList();
    setButtonClicked(false);
  }, [buttonClicked]);

  const deleteTitle = useCallback(async (id) => {
    const titleDoc = doc(db, "board", id);

    const currentUser = auth.currentUser;
    const postSnapshot = await getDoc(titleDoc);
    if (postSnapshot.exists()) {
      const postData = postSnapshot.data();
      if (postData.userId !== currentUser.uid) {
        alert("본인 글만 삭제할 수 있습니다.");
        return;
      }
    }
    // 질문삭제
    const subcollectionRef = collection(titleDoc, "question");
    const subcollectionSnapshot = await getDocs(subcollectionRef);
    subcollectionSnapshot.forEach(async (subDoc) => {
      await deleteDoc(subDoc.ref);
    });

    const answerSubcollectionRef = collection(titleDoc, "answer");
    const answerSubcollectionSnapshot = await getDocs(answerSubcollectionRef);
    answerSubcollectionSnapshot.forEach(async (answerDoc) => {
      await deleteDoc(answerDoc.ref);
    });

    await deleteDoc(titleDoc);
    setButtonClicked(true);
  }, []);




  const addAnswerField = useCallback(async (titleId, pollItemId) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }
  
    const answerSubcollectionRef = collection(
      doc(db, "board", titleId),
      "answer"
    );
    const answerDocRef = doc(answerSubcollectionRef, pollItemId);
  
    // answer 문서 가져오기
    const answerDoc = await getDoc(answerDocRef);
    if (answerDoc.exists()) {
      const currentData = answerDoc.data();
      let currentValue = currentData.answer || 0;
      alert("투표가 완료되었습니다.");
      // answer 필드 업데이트
      await updateDoc(answerDocRef, {
        answer: currentValue + 1,
      });
    } else {
      // answer 문서가 존재하지 않을 경우 새로 생성
      await setDoc(answerDocRef, {
        answer: 1,
      });
    }
  
    // 버튼 클릭 여부 상태 업데이트하여 렌더링 트리거
    setButtonClicked(true);
  
    // 투표값 계산하기
    const answerSubcollectionSnapshot = await getDocs(answerSubcollectionRef);
    let totalVotes = 0;
  
    answerSubcollectionSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.answer !== undefined) {
        totalVotes += data.answer;
      }
    });
    setTotalVotes(totalVotes);  
    setIsButtonClicked(true); 
  }, []);

  return (
    <div>
      {pollItems.map((titleItem) => (
        <MemoizedCustomDiv
          padding="50"
          width="50%"
          borderR="10px"
          margin="0 0 24px"
          border="1px solid #777"
          key={titleItem.id}
        >
          <div>제목: {titleItem.title}</div>
          <div>투표설명: {titleItem.content}</div>
          <div>
            {titleItem.pollItems.map((pollItem) => {
              const answerDataItem = answerData.find(
                (item) => item.id === pollItem.id
              );
              return (
                <FlexDiv key={pollItem.id} margin="16px 0">
                  <Button
                    width="200"
                    onClick={() => addAnswerField(titleItem.id, pollItem.id)}
                  >
                    "{pollItem.id}" 투표하기
                  </Button>
                  {answerDataItem && (
                    <FlexDiv js="center" ai="center" margin="0 0 0 16px">
                      투표결과: {answerDataItem.answer}
                      {isButtonClicked && <span>투표율: {((+answerDataItem.answer / +totalVotes) * 100).toFixed(2)}%
        </span>}
                    </FlexDiv>
                  )}
              </FlexDiv>
              );
            })}
          </div>
          {auth.currentUser && auth.currentUser.uid === titleItem.userId && (
            <Button
              width="200"
              onClick={() => {
                deleteTitle(titleItem.id);
              }}
            >
              글 삭제하기
            </Button>
          )}
        </MemoizedCustomDiv>
      ))}
    </div>
  );
};

export default PostList;
