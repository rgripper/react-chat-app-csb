import React, { Component, Fragment } from "react";
import { Greeter } from "./Greeter";
import { LoginForm } from "./LoginForm";
import { UserList } from "./UserList";
import { MessageList } from "./MessageList";

import "./styles.css";

class MessageForm extends React.Component {
  state = { text: "" };
  render() {
    return (
      <form
        onSubmit={event => {
          this.props.onSendMessage(this.state.text);
          this.setState({ text: "" });
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={this.state.text}
          onInput={event => this.setState({ text: event.currentTarget.value })}
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}

class App extends Component {
  state = { client: null };
  unsubscribe = null;

  componentWillMount() {
    this.unsubscribe = this.props.chatClient.stateChanges.subscribe(client =>
      this.setState({ client })
    );
  }

  tryLogin = name => {
    this.props.chatClient.tryLogin(name);
  };

  sendMessage = text => {
    this.props.chatClient.sendText(text);
  };

  render() {
    return (
      <div className="app">
        {!this.state.client.chat.isAuthenticated && (
          <Fragment>
            <h1>Please login</h1>
            <LoginForm onLogin={this.tryLogin} />
          </Fragment>
        )}
        {this.state.client.chat.isAuthenticated && (
          <Fragment>
            <Greeter
              name={
                this.state.client.chat.users.find(
                  x => x.id === this.state.client.chat.currentUserId
                ).name
              }
            />
            <div className="chat-content">
              <UserList users={this.state.client.chat.users} />
              <MessageList
                messages={this.state.client.chat.messages}
                users={this.state.client.chat.users}
              />
            </div>
            <MessageForm onSendMessage={this.sendMessage} />
          </Fragment>
        )}
        <div className="debug">{JSON.stringify(this.state.client)}</div>
      </div>
    );
  }
}

export default App;
