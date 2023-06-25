import React, {useState} from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import auth from '../../firebase'


const  SignUp= () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const signUp = (e) => {
   e.preventDefault();
  createUserWithEmailAndPassword(auth, email, password)
  .then((useCredential) => {
    console.log(useCredential)
  }).catch((error) =>{
    console.log(error);
  })
  }


  return (
    <div className='signInContainer'>
      <form onSubmit={signUp}>
        <h1>회원가입</h1>
        <input type="email" placeholder='이메일을 입력하세요' value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <input type="password" placeholder='비밀번호를 입력하세요' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>회원가입</button>
       </form>
    </div>
  )
}

export default SignUp;