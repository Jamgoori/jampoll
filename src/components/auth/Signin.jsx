import React, {useState} from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase'


const  Signin= () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const signIn = (e) => {
   e.preventDefault();
  signInWithEmailAndPassword(auth, email, password)
  .then((useCredential) => {
    console.log(useCredential);
    navigate('/mypage');
  }).catch((error) =>{
    console.log(error);
    alert("ID/PW를 잘못입력하였습니다.")
  })
  }


  return (
    <div className='signInContainer'>
      <form onSubmit={signIn}>
        <h1>로그인</h1>
        <input type="email" placeholder='이메일을 입력하세요' value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <input type="password" placeholder='비밀번호를 입력하세요' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>로그인</button>
       </form>
    </div>
  )
}

export default Signin;