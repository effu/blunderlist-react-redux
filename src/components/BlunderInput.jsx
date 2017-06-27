// https://stackoverflow.com/questions/39523040/concatenating-variables-and-strings-in-react
/* BlunderInput.jsx */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const defaultProps = {
  children: <div />,
  item: { name: '' },
  type: '',
};

const BlunderInput = ({
  children,
  item,
  onChange,
  onClick,
  type,
}) => (
  <div className={`item-${type}`}>
    <input
      placeholder={`${type} a blunder...`}
      onChange={onChange}
      value={item ? item.name : ''}
    />
    <button
      onClick={() => onClick(item)}
    >
      {`${type} Blunder`}
    </button>
    {children}
  </div>
);

BlunderInput.propTypes = propTypes;
BlunderInput.defaultProps = defaultProps;

export default BlunderInput;
