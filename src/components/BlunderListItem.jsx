/* BlunderListItem.jsx */
import React from 'react';
import PropTypes from 'prop-types';

const BlunderListItem = ({
  item,
  onClick,
  onChange,
}) => (
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

BlunderListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BlunderListItem;
