import React, { useEffect } from "react";
import { Container, Grow, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../reducers/posts";
import Posts from "../Posts/posts";
import Form from "../Form/form";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const posts = useSelector((state) => state.posts.posts);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          aligniterms="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
