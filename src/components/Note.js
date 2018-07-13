import React, { Component } from 'react';
import './Note.css';
import {TextArea, Button, Card, Transition} from 'semantic-ui-react'

class Note extends Component {

  constructor() {
    super();
    this.state = {visible: false}
    this.titleTextarea = React.createRef();
  }

  componentDidMount() {
    this.setState({ visible: !this.state.visible })
    }

  handleContentChange = e => {
    const { note, updateNote } = this.props;

    updateNote(note.title, e.target.value);
  }

  handleTitleChange = e => {
    const { note, updateNote } = this.props;

    if (e.target.value.charAt(e.target.value.length - 1) === '\n') return;

    // e.target.style.height = '5px';
    // e.target.style.height = e.target.scrollHeight + 'px';

    updateNote(e.target.value, note.content);
  }

  render() {
    const { note, deleteNote } = this.props;
    const { visible } = this.state;
    if (!note) return (
      <div className='noNote'>
        No note yet.
      </div>
    );

    return (
      <Transition visible={visible} animation='scale' duration={500}>
      <div className="Note">
      <div>


        <Card.Header className="title">
          <TextArea
            autoFocus
            ref={this.titleTextarea}
            value={note.title}
            onChange={this.handleTitleChange}
            className="Note-title"
            placeholder='Title...'
            />
        </Card.Header>
        <TextArea
          style={{ minHeight: 300 }}
          value={note.content}
          onChange={this.handleContentChange}
          className="Note-content"
          placeholder='Content...'
        />
      </div>
      <Button
        style={{display:'fixed', bottom:0}}
        id='delete'
        size='large'
                onClick={deleteNote}>
        Delete
      </Button>
      </div>

      </Transition>
    );
  }
}

export default Note;
