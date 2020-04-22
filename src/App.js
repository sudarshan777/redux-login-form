import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Tooltip, Button, Select, Checkbox, Icon } from "antd";
import "./App.css";
import { loginUser } from "./redux/actions/index";
const ErrorValidationLabel = ({ textLabel }) => (
  <label htmlFor="" style={{ color: "red", display: "block" }}>
    {textLabel}
  </label>
);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorText: "",
      isValid: true,
      result: "",
    };
  }

  onTextChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState, prevProps) => {
      return { [name]: value };
    });
  };

  isValid = () => {
    const { username, password } = this.state;
    if (username.length === 0 || password.length === 0) {
      this.setState({
        isValid: false,
        errorText: "Enter Username and Password before submitting.",
      });
      return false;
    }
    if (
      username.indexOf("@gmail.com") === -1 &&
      username.indexOf("@outlook.com") === -1
    ) {
      this.setState({
        isValid: false,
        errorText: "Should be an email from Gmail or Outlook",
      });
      return false;
    }
    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    if (this.isValid()) {
      this.props.dispatch(loginUser(username, password));
    }
  };
  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.result !== prevState.result) {
      console.log(newProps.result);
    }
    return null;
  }
  render() {
    const { username, password, errorText, isValid } = this.state;

    return (
      <div className="App">
        <Form>
          <Input
            placeholder="Enter your username"
            name="username"
            value={this.state.username}
            onChange={this.onTextChange}
            required
          />
          <Input.Password
            name="password"
            onChange={this.onTextChange}
            value={this.state.password}
            placeholder="Enter password"
            required
          />
          <Button type="primary" onClick={this.handleSubmit}>
            Login
          </Button>
          {isValid ? "" : <ErrorValidationLabel textLabel={errorText} />}
        </Form>
      </div>
    );
  }
}

export default App;
