import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import auth from "../../firebase";
import { Button, CustomDiv, FlexDiv, H1, Input } from "../style/Container.style";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("ID/PW를 잘못입력하였습니다.");
      });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("구글 로그인에 실패했습니다.");
      });
  };

  return (
    <CustomDiv width="900" margin="0 auto" padding="50">
      <form onSubmit={signIn}>
        <H1 margin="0">로그인</H1>
        <CustomDiv>
          <FlexDiv flexdr="column" ai="center">
            <Input
              maxwidth="500px"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              maxwidth="500px"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FlexDiv>
          <Button width="316" margin="16" type="submit">로그인</Button>
        </CustomDiv>
      </form>

      <div>
        <p>아직 회원이 아니신가요?</p>
        <Link to="/signup">회원가입</Link>
      </div>

      <Button margin="16 0" onClick={signInWithGoogle}>구글로 로그인</Button>
    </CustomDiv>
  );
};

export default Signin;
