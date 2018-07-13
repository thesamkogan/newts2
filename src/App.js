import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from './components/Sidebar';
import Note from './components/Note';
import './App.css';
// import { Responsive } from 'semantic-ui-react'


class App extends Component {

  createNote = () => {
    const { notes, dispatch } = this.props;
    dispatch({
      type: 'CREATE_NOTE',
      payload: notes.length,
    });
  }

  updateNote = (title, content) => {
    const { noteIndex, dispatch } = this.props;
    dispatch({
      type: 'UPDATE_NOTE',
      payload: {
        title,
        content,
        noteIndex: noteIndex,
      },
    });
  }

  deleteNote = () => {
    const { noteIndex, notes, dispatch } = this.props;
    dispatch({
      type: 'DELETE_NOTE',
      payload: {
        noteIndex,
        nextNoteIndex: noteIndex === notes.length - 1 ? notes.length - 2 : noteIndex,
      },
    })
  }

  switchNote = noteIndex => {
    const { dispatch } = this.props;
    dispatch({
      type: 'SWITCH_NOTE',
      payload: noteIndex,
    });
  }

  render() {
    const { notes, noteIndex } = this.props;
    return (
      <div className="App">

          <Sidebar
            notes={notes}
            noteIndex={noteIndex}
            createNote={this.createNote}
            switchNote={this.switchNote}
          />

        <Note
          note={notes.length ? notes[noteIndex] : null}
          noteIndex={noteIndex}
          updateNote={this.updateNote}
          deleteNote={this.deleteNote}
        />
      </div>
    );
  }
}

export default connect(s => s)(App);
