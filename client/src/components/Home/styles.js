import { createTheme } from "@mui/material";
const theme = createTheme();

const styles = {
  appBar: {
    borderRadius: 2,
    marginBottom: "2.5rem",
    display: "flex",
    padding: theme.spacing(2),
    marginTop: "3rem",
  },
  textField: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(2),
  },
};
export default styles;
