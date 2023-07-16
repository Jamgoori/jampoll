import React from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import { CustomDiv } from "../components/style/Container.style";

const Main = () => {
  return (
    <CustomDiv width="1200" margin="0 auto">
      <PostList />
      <PostForm />
    </CustomDiv>
  );
};

export default Main;
