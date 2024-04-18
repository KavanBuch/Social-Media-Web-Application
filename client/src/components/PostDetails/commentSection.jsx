import React, { useEffect, useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { setUser } from "../../reducers/auth";
import { commentPost } from "../../reducers/posts";

const CommentSection = ({ post }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const user = useSelector((state) => {
    return state.user.user;
  });

  const handleComment = async () => {
    const obj = {
      value: `${user}: ${comment}`,
      id: post._id,
    };
    const newPost = await dispatch(commentPost(obj));
    setComments(newPost.payload.comments);
    setComment("");
  };

  useEffect(() => {
    dispatch(setUser());
  }, []);
  return (
    <div>
      <div style={styles.commentsOuterContainer}>
        <div style={styles.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c}</strong>
            </Typography>
          ))}
        </div>
        {user && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={handleComment}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
