import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../reducers/posts";

const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (page) dispatch(fetchPosts(page));
  }, [page]);
  const numberOfPages = useSelector((state) => {
    return state.posts.numberOfPages;
  });
  return (
    <Pagination
      sx={styles.ul}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => {
        return (
          <PaginationItem
            sx={styles.li}
            {...item}
            component={Link}
            to={`/posts?page=${item.page}`}
          />
        );
      }}
    />
  );
};

export default Paginate;
