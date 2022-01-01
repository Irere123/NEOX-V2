import ReactDOM from "react-dom";
import ReactModal from "react-modal";
import { ApolloProvider } from "@apollo/client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "./styles/globals.css";
import Routes from "./Routes";
import { init_i18n } from "./i18n";
import { client } from "./lib/apolloClient";

init_i18n();
ReactModal.setAppElement("#root");

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById("root")
);

dayjs.extend(relativeTime);
