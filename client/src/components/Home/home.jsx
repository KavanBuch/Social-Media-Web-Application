import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  Chip,
  Autocomplete,
} from "@mui/material";
import Posts from "../Posts/posts";
import Form from "../Form/form";
import Pagination from "../Pagination/pagination";
import styles from "./styles";
import { fetchPostsBySearch } from "../../reducers/posts";
import { useNavigate, useSearchParams } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  const handleAddChip = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteChip = (tagToDelete) => {
    setTags(
      tags.filter((tag) => {
        return tag != tagToDelete;
      })
    );
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      console.log(search);
      dispatch(fetchPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e, fromTags) => {
    if (e.keyCode === 13 && fromTags) {
      handleAddChip(tag);
    }
  };
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
            <AppBar sx={styles.appBar} position="static" color="inherit">
              <TextField
                sx={styles.textField}
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Posts"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Autocomplete
                multiple
                freeSolo
                value={tags}
                options={[]}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      onDelete={() => handleDeleteChip(option)}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    sx={styles.textField}
                    {...params}
                    value={tag}
                    variant="outlined"
                    label="Add Tags"
                    placeholder="Type and press enter"
                    onChange={(e) => setTag(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, true)}
                  />
                )}
              />

              <Button
                sx={styles.button}
                onClick={searchPost}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form />
            <Paper elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
