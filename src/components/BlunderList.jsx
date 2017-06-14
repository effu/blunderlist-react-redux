/* BlunderList.jsx */
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
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  items: [],
};

const BlunderList = (props) => {
  const { items, onClick, onChange } = props;
  return (
    <div className="item-list">
      <ul>
        {items.map((item) => {
          const {
            name,
            id,
            completed,
          } = item;
          if (completed) return null;
          return (
            <li key={id}>
              <input
                type="checkbox"
                onChange={() => onChange(item)}
              />
              <span onClick={() => onClick(item)}>
                {name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

BlunderList.propTypes = propTypes;
BlunderList.defaultProps = defaultProps;

export default BlunderList;
