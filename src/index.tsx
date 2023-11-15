import ReactDOM from "react-dom/client";
import Users from "./pages/users";
import client from "./graphql/connection";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme();
root.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Users />
    </ThemeProvider>
  </ApolloProvider>
);
