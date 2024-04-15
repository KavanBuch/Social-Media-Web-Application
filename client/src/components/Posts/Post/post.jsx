import React, { useEffect, useState } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import defaultPost from "../../../images/defaultPost.jpg";
import { useSelector, useDispatch } from "react-redux";
import { setPostId } from "../../../reducers/post";
import { likePost, deletePost } from "../../../reducers/posts";
import { setUser } from "../../../reducers/auth";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [color, setColor] = useState(0);
  const user = useSelector((state) => state.user.user);
  const handleLikes = (id) => {
    setColor((prevColor) => {
      if (!user) return prevColor;
      return !prevColor;
    });
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

  useEffect(() => {
    const newLikes = post.likes.filter((likedBy) => {
      return likedBy == user;
    });
    setColor(newLikes.length);
    dispatch(setUser());
  }, []);

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
          <ThumbUpAltIcon
            fontSize="small"
            color={!color ? "primary" : "secondary"}
          />
          <Typography variant="string" color={!color ? "primary" : "secondary"}>
            {post.likes.length + " "}
            Likes
          </Typography>
        </Button>
        {post.creator === user && (
          <>
            <Button size="small" onClick={() => handleUpdatePost(post._id)}>
              <EditIcon fontSize="small" /> Edit
            </Button>
            <Button
              size="small"
              color="primary"
              sx={styles.button}
              onClick={() => handleDeletePost(post._id)}
            >
              <DeleteIcon fontSize="small" /> Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
