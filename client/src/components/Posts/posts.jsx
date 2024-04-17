import React from "react";
import Post from "./Post/post";
import styles from "./styles";
import { Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  return (
    <>
      {!posts.length ? (
        <CircularProgress sx={styles.circularProgress} />
      ) : (
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
      )}
    </>
  );
};

export default Posts;
