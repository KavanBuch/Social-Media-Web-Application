import React from "react";
import styles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import defaultPost from "../../../images/defaultPost.jpg";
import { useDispatch } from "react-redux";
import { setPostId } from "../../../reducers/post";
import { likePost, deletePost } from "../../../reducers/posts";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const handleLikes = (id) => {
    dispatch(setPostId(id));
    dispatch(likePost(id));
    dispatch(setPostId(null));
  };

  const handleUpdatePost = (id) => {
    dispatch(setPostId(id));
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <Card sx={styles.card}>
      <CardMedia
        sx={styles.cardMedia}
        image={post.selectedFile || defaultPost}
        title={post.title}
      />
      <CardContent sx={styles.cardContent}>
        <Typography variant="h6" sx={styles.creator}>
          {post.creator}
        </Typography>
        <Typography variant="body2" sx={styles.createdAt}>
          {moment(post.createdAt).fromNow()}
        </Typography>
        <Button size="small" onClick={() => handleUpdatePost(post._id)}>
          <MoreHorizIcon fontSize="default" />
        </Button>
        <Typography variant="body2" sx={styles.tags}>
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2" sx={styles.title}>
          {post.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          sx={styles.message}
        >
          {post.message}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          sx={styles.button}
          onClick={() => handleLikes(post._id)}
        >
          <ThumbUpAltIcon fontSize="small" /> Like {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          sx={styles.button}
          onClick={() => handleDeletePost(post._id)}
        >
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
