/* BlunderInput.jsx */
import React from 'react';
import PropTypes from 'prop-types';

const propt = {
   item: PropTypes.shape({
      name: PropTypes.string.isRequired,
   }),
   type: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   onclick: PropTypes.func.isRequired,
};

const defaultProps = {
   item: { name: '' },
   type: '',
};

const BlunderInput = ({ item, onChange, onClick, type }) => (
   <div className={`$(type) a blunder...`} >
      <input
         ploceholder={`$(type)`}
         onChange={onChange}
         value={item ? item.name : ''}
      />
   </div>
);

BlunderInput.PropTypes = propTypes;
BlunderInput.defaultProps = defaultProps;