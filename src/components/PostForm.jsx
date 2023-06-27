import {useState} from 'react'
import {db} from '../firebase'
import {addDoc, collection} from 'firebase/firestore'


const PostForm = () => {
  const [newTitle, setNewTitle] = useState("")
  const titleCollectionRef = collection(db, "board")


  const createTitle = async () =>{
    await addDoc(titleCollectionRef, {title: newTitle})
  }

  return (
    <div>
      <input placeholder='제목' onChange={(e) => {setNewTitle(e.target.value)}}/>
      <button onClick={createTitle}>글 쓰기</button>
    </div>
  )
}

export default PostForm