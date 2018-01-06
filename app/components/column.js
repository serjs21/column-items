import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import {Droppable} from 'react-beautiful-dnd';
import * as MaterialDesign from 'react-icons/lib/md'
import {connect} from 'react-redux';
import {addCard} from './reducers/actions';

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : '#FAFAFF',
  width:      250
});

@connect(null, {addCard})
export default class ColumnComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes    = {
    cardsData: PropTypes.array,
    title:     PropTypes.string,
  };
  static defaultProps = {
    title:     'Column title',
    cardsData: [{}, {}, {}],
  };

  _onAdd = () => {
    this.props.addCard(this.props.id);
  };

  render() {
    return (
    <div className="column-wrapper">
                  <div className="column-title">
              <div>{this.props.title}</div>
              <div onClick={this._onAdd} className="add-button">
                <MaterialDesign.MdNoteAdd/>
              </div>
            </div>
      <Droppable droppableId={`${this.props.id}`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}

          >
            <div className="column">
              {this.props.cardsData.map((card, index) => <Card key={index}
                                                               id={index}
                                                               columnId={this.props.id}
                                                               {...card}/>)}
            </div>

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>

    )
  }
}
