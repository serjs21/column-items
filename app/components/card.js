import React from 'react';
import PropTypes from 'prop-types';
import * as MaterialDesign from 'react-icons/lib/md'
import {Draggable} from 'react-beautiful-dnd';
import {updateCard, removeCard} from './reducers/actions';
import {connect} from 'react-redux';

const getItemStyle = (draggableStyle, isDragging) => ({
  userSelect: 'none',
  height:     '200px',
  ...draggableStyle
});

@connect(null, {updateCard, removeCard})
export default class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit:  false,
      title: props.title,
    };
  }

  static propTypes    = {
    title: PropTypes.string,
    data:  PropTypes.string,
  };
  static defaultProps = {
    title: 'title',
    data:  "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.text && this.state.edit !== prevState.edit) {
      this.text.focus();
    }
  }

  _changeMode = e => {
    this.setState(privState => ({edit: !privState.edit}));
    if (this.text) {
      this.props.updateCard({
        id:        this.props.id,
        columnId:  this.props.columnId,
        cardTitle: this.title.value,
        cardData:  this.text.value,
      })
    }
  };

  _displayMode = () =>
    <div className="data">
      <div className="title">{this.props.title}</div>
      <div className="text">
        <pre>{this.props.data}</pre>
      </div>
      <div onClick={this._changeMode} className="edit-hover">
        <MaterialDesign.MdEdit/>
      </div>
      <div onClick={this._onDelete} className="delete-hover">
        <MaterialDesign.MdDelete/>
      </div>
    </div>;

  _onTitleChange = (e) => {
    this.setState({title: e.target.value})
  };

  _onDelete = () => {
    this.props.removeCard({
      id:       this.props.id,
      columnId: this.props.columnId
    })
  };

  _editMode = () => <div className="edit">
    <input type="text"
           name="name"
           value={this.state.title}
           className="edit-title"
           ref={ref => this.title = ref}
           onChange={this._onTitleChange}
    />
    <textarea cols={10} ref={ref => this.text = ref} placeholder="Write yor note here...">{this.props.data}</textarea>
    <div onClick={this._changeMode} className="edit-hover">
      <MaterialDesign.MdSave/>
    </div>
  </div>;

  render() {
    return (
      <Draggable
        key={`${this.props.columnId}-${this.props.id}`}
        draggableId={`${this.props.columnId}-${this.props.id}`}
      >
        {(provided, snapshot) => (
          <div className="card-wrapper">
            <div
              ref={provided.innerRef}
              style={getItemStyle(
                provided.draggableStyle,
                snapshot.isDragging
              )}
              {...provided.dragHandleProps}
            >
              <div className="card">

                {this.state.edit ? this._editMode() : this._displayMode()}
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }
}


