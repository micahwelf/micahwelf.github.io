import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const propTypes = {
	users: PropType.array,
};

const defaultProps = {
	users: [],
};

class LoginView extends Component {
	state = {
		currentUser: this.props.users[0],
	}
}


LoginView.propTypes = propTypes;
LoginView.defaultProps = defaultProps;

function mapStateToProps(state) {
	console.log(state);
	return {
		users: state.users,
	};
}

export default connect(mapStateToProps)(state);
