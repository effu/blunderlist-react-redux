/* BlunderList.jsx */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  items: PropTypes.array.isRequired,
};

const BlunderList = (props) => {
  const { items } = props;
  return (
    <div className="item-list">
      <ul>
        {items.map((item) => {
          const { name, id } = item;
          return <li key={id}>{name}</li>;
        })}
      </ul>
    </div>
  );
};

BlunderList.propTypes = propTypes;

export default BlunderList;
