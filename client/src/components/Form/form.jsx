import React, { useState, useEffect } from "react";
import styles from "./styles";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../reducers/posts";
import { setPostId } from "../../reducers/post";
import { setUser } from "../../reducers/auth";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadButton, setLoadButton] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [postData, setPostData] = useState({
    creator: user,
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  const clear = () => {
    setPostData({
      creator: user,
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
    dispatch(setPostId(null));
  };

  const post_id = useSelector((state) => state.post.post);
  const posts = useSelector((state) => state.posts.posts);
  const post = posts.find((post) => {
    return post._id == post_id;
  });
  const handleSubmit = async (e) => {
    setLoadButton(true);
    e.preventDefault();
    if (post_id) {
      const result = await dispatch(updatePost({ post_id, postData }));
      navigate(`/posts/${result.payload._id}`);
    } else {
      const result = await dispatch(createPost(postData));
      navigate(`/posts/${result.payload._id}`);
    }
    setLoadButton(false);
    clear();
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  useEffect(() => {
    dispatch(setUser());
    setLoadButton(false);
  }, []);

  useEffect(() => {
    setPostData((prevPostData) => ({
      ...prevPostData,
      creator: user,
    }));
  }, [user]);

  return (
    <Paper sx={styles.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        style={styles.form}
      >
        <Typography variant="h6">
          {post_id ? "Edit" : "Create"} A Post
        </Typography>
        <TextField
          name="creator"
          variant="filled"
          label=""
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
          sx={styles.textField}
          inputProps={{ readOnly: true }}
        />
        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          sx={styles.textField}
        />
        <TextField
          name="message"
          variant="outlined"
          label="message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          sx={styles.textField}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
          sx={styles.textField}
        />
        <div>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
            sx={styles.fileInput}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          sx={styles.submitButton}
          disabled={!user}
        >
          {user
            ? !loadButton
              ? "Submit"
              : "Making Changes..."
            : "LogIn to Create a Post"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
          sx={styles.clearButton}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
