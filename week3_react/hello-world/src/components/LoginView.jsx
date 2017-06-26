//  LoginView.jsx  //


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { USER_CREATE_REQ } from '../actions';

const propTypes = {
   users: PropType.array,
   dispatch: PropTypes.func.isRequired,
};

const defaultProps = {
   users: [],
};

class LoginView extends Component {
   state = {
      currentUser: this.props.users[0],
   }

   //  debugging structior:
   constructor(props) {
      super(props);
      let currentUser;
      currentUser = { name: '', password: '' };
      //const currentUser = tihs.props.users[0];
      this.state = { currentUser };
   }


   onFieldChange = (event) => {
      this.setState({
         currentUser: {
            ...this.state.currentUser,
            [event.target.name]: event.target.value,
         },
      });
      console.log('this field just changed');
   }

   doLogin = () => {
      this.props.dispatch({
         type: USER_CREATE_REQ,
         user: this.state.currentUser,
      });
      console.log('I need to submit to redux');
   }

   render() {
      const { password } = this.state.currentUser;
      const { users } = this.props;
      return (
         <div>
            <input
               name="username"
               placeholder="Enter your username..."
               onChange={event => this.onFieldChange(event)} />
            <input
               name="password"
               placeholder="Enter your password..."
               onChange={event => this.onFieldChange(event)} />
            <button
               onClick={this.doLogin}>
               Login
            </button>
            {users.map((user) => {
               const { username, password } =  user;
               return (
                  <div>
                     <div>{username}</div>
                     <div>{password}</div>
                  </div>
               )
            })}
         </div>
      );
   }
}




LoginView.propTypes = propTypes;
LoginView.defaultProps = defaultProps;

function mapStateToProps(state) {
   console.log(state);
   return {
      users: state.users || { },
   };
}

export default connect(mapStateToProps)(state);
