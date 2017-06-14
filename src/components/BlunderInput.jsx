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
};

const defaultProps = {
  item: { name: '' },
  type: '',
};

const BlunderInput = ({ item, onChange, onClick, type }) => (
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
  </div>
);

BlunderInput.propTypes = propTypes;
BlunderInput.defaultProps = defaultProps;

export default BlunderInput;
