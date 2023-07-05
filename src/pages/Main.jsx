import React from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";

const Main = () => {
  return (
    <div className="mainbody">
      <PostList />
      <PostForm />
    </div>
  );
};

export default Main;
