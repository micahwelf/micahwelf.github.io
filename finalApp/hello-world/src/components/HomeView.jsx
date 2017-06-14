import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ITEM_CREATE_REQ } from '../actions';

import AddBlunder from './AddBlunder';
import BlunderList from './BlunderList';

const propTypes = {
  items: PropTypes.array.isRequired,
};

const defaultProps = {
  items: [],
}

class HomeView extends Component {
  state = {
    currentItem: this.props.items[0],
  }

onItemEdit = () => {
  const { editItem } = this.state;
  console.log(editItem.id, editItem.name);
}


onItemClick = (event) => {
  const { items } = this.page;
  const { value } = event.target;
  this.setState({ editItem: items[value] });
}

  onItemChange = (event) => {
    // const item = event.target.value;
    const currentItem = {
      name: event.target.value,
    };
    this.setState({ currentItem });
  }

  onItemCreate = () => {
    const { currentItem } = this.state;
    this.props.dispatch({
      type: ITEM_CREATE_REQ,
      item: currentItem,
    });
    this.setState({ currentItem: { name: '' } });
  }

onItemUpdate = () => {
  const { editItem } = this.state;
  this.props.dispatch({
    type: ITEM_UPDATE_REQ,
    item: editItem,
  });
  this.setState({ editItem: { name: '' } });
}

onItemClick = (event) => {
  const { items } = ;
  const {  } = 
}

onEditItemChange = (event) => {
  const { id } = this.state.editItem;
  const editItem = {
    name: event.target.value,
    id,
  };
  this.setState({ editItem });
}


  render() {
    const { items } = this.props;
    const { currentItem } = this.state;

    return (
      <div>
      <AddBlunder
      item={currentItem}
      onChange={this.onItemChange}
      onClick= {this.onItemCreate}
      />
      <BlunderList items={items} />
      <div className="item-edit">
        <input 
          onChange={this.onEditItemChange}
          value={editItem ? editItem.name: ''}
        />
        <button onClick={this.onItemCreate}>SaveBlunder</button>
      </div>
      // following => Hide
        <div>
          I am home
        <input
            placeholder="Add a to-do..."
            onChange={(e) => {
              console.log(e.target.value)
            }}
            value={this.state.currentItem}
          />
          <button
            onClick={this.onItemChange}
          >
            Add Todo
        </button>
        // preceeding => Hide
        </div>
        <div className="item-list">
        <ul>
        {items.map((item) => {
          const { name, id } = itme;
          return <li key={id}>{name}</li>;
        })}
        </ul>
<ul>    

        </div>
      </div>
    );
  }
}

HomeView.propTypes = propTypes;
HomeView.defaultProps = defaultProps;

function mapStoresStateToProps(state) {
  return {
    items: state.items,
  };
}

export default connect(mapStateToProps)(HomeView);
