import React from "react";
import { render } from "react-dom";
import App from "./App";
import { ChatClient } from "meetup-chat-client";
const chatClient = ChatClient.connect(
  "https://serene-basin-84996.herokuapp.com/"
);

const reset = () => fetch("https://serene-basin-84996.herokuapp.com/clear");

chatClient.tryLogin("haha3");

render(
  <App chatClient={chatClient} reset={reset} />,
  document.getElementById("root")
);
