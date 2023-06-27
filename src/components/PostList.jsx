import {useState, useEffect} from 'react'
import {db} from '../firebase'
import {collection, getDocs} from 'firebase/firestore'

const PostList = () => {
    const [title, setTitle] = useState([]);
    const titleCollectionRef = collection(db, "board")
    useEffect(()=>{
      const getTitle = async () =>{
        const data = await getDocs(titleCollectionRef);
        setTitle(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
      }
      getTitle()
    },[])
  return (
    <div>{title.map((title)=>{
        return(
            <>
        <div>제목: {title.title}</div>
        <div>토의: {title.dscuss1}</div>
        </>
        );
    })}</div>
  )
}

export default PostList