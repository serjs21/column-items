import React from 'react';
import Grid from './grid';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'
import {List} from 'immutable';

require('./App.css');

@connect(createStructuredSelector({
    columns: state => state.get('columns'),
  }))
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    columns: List(),
  };

  render() {
    return (
      <div id="root">
        <Grid columnData={this.props.columns.toJS()}/>
      </div>
    );
  }
}
