import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
   items: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.string.isRequired,
         name: PropTypes.string.isRequired,
      }),
   ),
   onClick: PropTypes.func.isRequired,
};
const BlunderList = (props) => {
   const { items } = props;
   return (
      <div className="item-list">
         <ul>
            {items.map((item, index) => {
               const {
                  name,
                  id,
                  completed,
                  } = item;
               return (
                  <li
                     key={id}
                     value={index}
                     onClick={onClick}
                  >
                     {name}
                  </li>
               )
            })}
         </ul>
      </div >
   );
};

BlunderList.propTypes = propTypes;

export default BlunderList;