import React from "react";

export class LoginForm extends React.Component {
  state = { name: "" };
  render() {
    return (
      <form
        className="login-form"
        onSubmit={event => {
          this.props.onLogin(this.state.name);
          event.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="user name"
          value={this.state.name}
          onInput={event => this.setState({ name: event.currentTarget.value })}
        />
        <button type="submit">Login</button>
      </form>
    );
  }
}
