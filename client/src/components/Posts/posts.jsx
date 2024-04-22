import React, { useState } from "react";
import Post from "./Post/post";
import styles from "./styles";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import CircularProcess from "../CircularProcess";
import FlashMessage from "../FlashMessage";

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const message = useSelector((state) => state.message.message);

  return (
    <>
      {!posts.length ? (
        <>
          <CircularProcess />
        </>
      ) : (
        <>
          {message.length > 0 && <FlashMessage message={message} />}
          <Grid
            container
            alignItems="stretch"
            spacing={3}
            style={styles.gridContainer}
          >
            {posts.map((post) => (
              <Grid item key={post._id} xs={12} sm={12} md={6} lg={6}>
                <Post post={post} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default Posts;
