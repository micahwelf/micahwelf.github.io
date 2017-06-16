//  BlunderListItem.jsx  //
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
   item: PropTypes.share({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
   }),
   onClick:  PropTypes.func.isRequired,
   onChange: PropTypes.func.isRequired,
};

const defaultProps = {
   item: {},
}


// step 14b
const BlunderListItem = ({ item, onClick, onChange }) => (
   <li key={item.id}>
      <input
         checked={item.completed}
         type="checkbox"
         onChange={() => onChange(item)}
         />
      <span onClick={() => onClick(item)}>
         {item.name}
      </span>
   </li>
);
