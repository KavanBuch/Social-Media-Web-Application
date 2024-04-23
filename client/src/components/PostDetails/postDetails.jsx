import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  Divider,
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";
import defaultPost from "/images/defaultPost.jpg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../reducers/posts";
import moment from "moment";
import styles from "./styles";
import { fetchPostsBySearch } from "../../reducers/posts";
import { useNavigate } from "react-router-dom";
import CommentSection from "./commentSection";
import CircularProcess from "../CircularProcess";

const postDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => {
    return state.posts.post;
  });
  const posts = useSelector((state) => {
    return state.posts.posts;
  });
  const message = useSelector((state) => state.message.message);
  useEffect(() => {
    const fetch = async () => {
      const result = await dispatch(getPost(id));
      if (result.error) {
        navigate("/notfound");
      }
    };
    fetch();
  }, [id]);

  useEffect(() => {
    if (post)
      dispatch(
        fetchPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
  }, [post]);

  if (!post) {
    return <CircularProcess />;
  }

  const recommendedPosts = posts.filter((post) => {
    return post._id != id;
  });

  const openPost = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <>
      {message && <FlashMessage message={message} />}
      <Paper sx={styles.paper} elevation={6}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <div style={styles.card}>
              <div style={styles.section}>
                <Typography variant="h3" component="h2">
                  {post.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  color="textSecondary"
                  component="h2"
                >
                  {post.tags.map((tag) => `#${tag} `)}
                </Typography>
                <Typography gutterBottom variant="body1" component="p">
                  {post.message}
                </Typography>
                <Typography variant="subtitle2">
                  Created by: {post.creator}
                </Typography>
                <Typography variant="subtitle2">
                  {moment(post.createdAt).fromNow()}
                </Typography>
                <Divider style={{ margin: "20px 0" }} />
                <CommentSection post={post} />
                <Divider style={{ margin: "20px 0" }} />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div style={styles.imageSection}>
              <img
                style={styles.media}
                src={post.selectedFile || defaultPost}
                alt={post.title}
              />
            </div>
          </Grid>
        </Grid>
        {!!recommendedPosts.length && (
          <>
            <Divider style={{ margin: "20px 0" }} />
            <Typography gutterBottom variant="h5">
              You might also like:
            </Typography>
            <Grid container spacing={2}>
              {recommendedPosts.map(
                ({ _id, title, name, message, likes, selectedFile }) => (
                  <Grid item xs={12} sm={6} md={4} key={_id}>
                    <Card style={styles.recommendedPost}>
                      <CardContent>
                        <Typography gutterBottom variant="h6">
                          {title}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2">
                          {name}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2">
                          {message}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          Likes: {likes.length}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => openPost(_id)}>
                          Read More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
          </>
        )}
      </Paper>
    </>
  );
};

export default postDetails;
