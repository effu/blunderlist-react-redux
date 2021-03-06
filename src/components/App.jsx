import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const App = props => (
  <div>
    {props.children}
  </div>
);

App.propTypes = propTypes;

export default App;
