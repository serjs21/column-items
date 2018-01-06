import React from 'react';
import PropTypes from 'prop-types';
import Column from './column';
import {DragDropContext} from 'react-beautiful-dnd';
import {moveCard} from './reducers/actions';
import {connect} from 'react-redux';


const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding:    8,
  width:      250
});

@connect(null, {moveCard})
export default class GridComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  static propTypes    = {
    columnData: PropTypes.array,
  };
  static defaultProps = {
    columnData: [{}, {}],
  };

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    this.props.moveCard({
      srcColumnId: Number(result.source.droppableId),
      srcCardId: result.source.index,
      dstColumnId: Number(result.destination.droppableId),
      dstCardId: result.destination.index,
    })
  }


  render() {
    return (

      <DragDropContext onDragEnd={this.onDragEnd}>

        <div className="grid">{this.props.columnData.map((column, index) => <Column key={index}
                                                                                    id={index} {...column}/>)}</div>

      </DragDropContext>
    );
  }
}
