import ReactDOM from "react-dom";
import ReactModal from "react-modal";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "./styles/globals.css";
import Routes from "./Routes";
import { init_i18n } from "./i18n";

init_i18n();
ReactModal.setAppElement("#root");

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById("root")
);

dayjs.extend(relativeTime);
