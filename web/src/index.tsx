import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";

import "./styles/globals.css";
import Routes from "./Routes";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: "https://api-neox-next.herokuapp.com//graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById("root")
);
