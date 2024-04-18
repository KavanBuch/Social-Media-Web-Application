import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import defaultPost from "../../images/defaultPost.jpg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../reducers/posts";
import moment from "moment";
import styles from "./styles";
import { fetchPostsBySearch } from "../../reducers/posts";
import { useNavigate } from "react-router-dom";
import CommentSection from "./commentSection";

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
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post)
      dispatch(
        fetchPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
  }, [post]);

  if (!post) {
    return (
      <Paper elevation={6} sx={styles.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter((post) => {
    return post._id != id;
  });

  const openPost = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <Paper sx={styles.paper} elevation={6}>
      <div style={styles.card}>
        <div style={styles.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.creator}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div style={styles.imageSection}>
          <img
            style={styles.media}
            src={post.selectedFile || defaultPost}
            alt={post.title}
          />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div style={styles.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div style={styles.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
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
                  <img src={selectedFile || defaultPost} width="200px" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default postDetails;
