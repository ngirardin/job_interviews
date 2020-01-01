import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../actions/user.actions";

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "",
        password: ""
      },
      submitted: false
    };

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserChange(event) {
    // handle input change and dispatch register
    this.setState({
      submitted: this.state.submitted,
      user: { ...this.state.user, username: event.target.value }
    });
  }

  handlePasswordChange(event) {
    this.setState({
      submitted: this.state.submitted,
      user: { ...this.state.user, password: event.target.value }
    });
  }

  handleSubmit(event) {
    // handle button click and dispatch register
    event.preventDefault();
    const state = this.state;
    this.setState({
      ...state,
      submitted: true
    });

    const { dispatch } = this.props;
    dispatch(userActions.register(this.state.user));
  }

  render() {
    const { user, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form">
          <div
            className={
              "form-group" + (submitted && !user.username ? " has-error" : "")
            }
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control username"
              name="username"
              onChange={this.handleUserChange}
            />
            {submitted && !user.username && (
              <div className="help-block">Username is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !user.password ? " has-error" : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control password"
              name="password"
              onChange={this.handlePasswordChange}
            />
            {submitted && !user.password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Register
            </button>
            <Link to="/login" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

// complete the below function
function mapStateToProps(state) {
  const { alert, authentication, registration } = state;
  return {
    alert,
    authentication,
    registration
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { RegisterPage as TestRegisterPage };
export { connectedRegisterPage as RegisterPage };
