/* BlunderList.jsx */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const defaultProps = {
  items: [],
};

const BlunderList = (props) => {
  const { children } = props;
  return (
    <div className="item-list">
      <ul>
        {children}
      </ul>
    </div>
  );
};

BlunderList.propTypes = propTypes;
BlunderList.defaultProps = defaultProps;

export default BlunderList;
