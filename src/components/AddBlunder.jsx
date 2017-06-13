/* AddBlunder.jsx */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  item: { name: '' },
};

const AddBlunder = ({ item, onChange, onClick }) => (
  <div className="item-add">
    <input
      placeholder="Add a blunder..."
      onChange={onChange}
      value={item ? item.name : ''}
    />
    <button onClick={onClick}>Add Blunder</button>
  </div>
);

AddBlunder.propTypes = propTypes;
AddBlunder.defaultProps = defaultProps;

export default AddBlunder;
