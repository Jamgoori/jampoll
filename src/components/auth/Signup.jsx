import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Button, CustomDiv, FlexDiv, FlexForm, H1, Input } from "../style/Container.style";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <CustomDiv width="900" margin="0 auto" padding="50">
      <FlexForm flexdr="column" ai="center" onSubmit={signUp}>
        <H1 margin="0">회원가입</H1>
        <CustomDiv>
        <FlexDiv flexdr="column" ai="center" margin="30px 0">
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
        <Input
          maxwidth="500px"
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button width="320" borderR="5px" margin="30px auto" type="submit">회원가입</Button>
        </FlexDiv>
        </CustomDiv>
      </FlexForm>
    </CustomDiv>
  );
};

export default SignUp;
