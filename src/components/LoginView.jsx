/* LoginView.jsx */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { USER_CREATE_REQ } from '../actions';

const propTypes = {
  users: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

const defaultProps = {
  users: [],
};

class LoginView extends React.Component {
  constructor(props) {
    super(props);

    const currentUser = { name: '', password: '' };
    this.state = { currentUser };
  }

  onFieldChange = (event) => {
    this.setState({
      currentUser: {
        ...this.state.currentUser,
        [event.target.name]: event.target.value,
      },
    });
  }

  doLogin = () => {
    this.props.dispatch({
      type: USER_CREATE_REQ,
      user: this.state.currentUser,
    });
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <input
          name="username"
          placeholder="Enter your username..."
          onChange={event => this.onFieldChange(event)}
        />
        <input
          name="password"
          placeholder="Enter your password..."
          onChange={event => this.onFieldChange(event)}
        />
        <button
          onClick={this.doLogin}
        >
          Login
        </button>
        {users.map((user) => {
          const { username, password } = user;
          return (
            <div>
              <div>{username}</div>
              <div>{password}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

LoginView.propTypes = propTypes;
LoginView.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(LoginView);
