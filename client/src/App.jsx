import React from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Avatar,
} from "@mui/material";
import Posts from "./components/Posts/posts";
import Form from "./components/Form/form";
import styles from "./styles";
import logo from "./images/logo.jpg";

function App() {
  return (
    <Container maxWidth="lg">
      <AppBar sx={styles.appBar} position="static" color="inherit">
        <Typography sx={styles.heading} variant="h2" align="center">
          Instander
        </Typography>
        <Avatar src={logo} sx={styles.image} />
      </AppBar>
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
    </Container>
  );
}

export default App;
