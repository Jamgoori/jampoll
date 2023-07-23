import React from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import { CustomDiv } from "../components/style/Container.style";

const Main = () => {
  return (
    <CustomDiv width="1200" margin="0 auto">
      <div>메인</div>
      <PostList />
    </CustomDiv>
  );
};

export default Main;
