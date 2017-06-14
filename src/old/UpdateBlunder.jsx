/* UpdateBlunder.jsx */
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

const UpdateBlunder = ({ item, onChange, onClick }) => (
  <div className="item-edit">
    <input
      placeholder="Update a blunder..."
      onChange={onChange}
      value={item ? item.name : ''}
    />
    <button onClick={onClick}>Update Blunder</button>
  </div>
);

UpdateBlunder.propTypes = propTypes;
UpdateBlunder.defaultProps = defaultProps;

export default UpdateBlunder;
