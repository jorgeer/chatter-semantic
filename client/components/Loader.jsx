import React from 'react';

const Loader = React.createClass({

  render() {

    return (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">
          Loading...
        </div>
      </div>
    );
  }
});

export default Loader;
