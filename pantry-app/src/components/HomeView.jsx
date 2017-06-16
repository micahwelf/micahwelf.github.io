import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const propTypes = {
   items: PropTypes.array,
};

const defaultProps = {
   items:[],
};

class HomeView extends Component {
   state = {
      currentItem: this.props.items[0],
   }

   render() {
      return (
         <div>
            I am home
         </div>
      );
   }
}

HomeView.propTypes = propTypes;

function mapStateToProps(state) {
   return {
      items: state.items,
   };
}

export default connect(mapStateToProps)(HomeView);
