import React, { Component } from 'react';
import './Sidebar.css';
import { Button, List, Dropdown, Image } from 'semantic-ui-react'
import ofnotes from '../../src/ofnotes.png'

class Sidebar extends Component {

  render() {
    const { notes, noteIndex, createNote, switchNote} = this.props;
    const noteList = notes.map((note, i) => {
      let className = 'Sidebar-list-item';
      if (i === noteIndex) className += ' Sidebar-list-item-active';
      return (
        <List.Item
          key={i}
          className={className}
          onClick={() => switchNote(i)}
        >
          {note.title}
          <p style={{fontWeight: 'normal'}}>{note.content}</p>
        </List.Item>
      );
    });

    return (
      <div className="Sidebar">
      <div className='Sidebar-create-note-button-wrapper'>
      <Image
      className='logo'
      src={ofnotes}
      size='small'/>
      </div>
        <Button size='large' onClick={createNote}>New note</Button>
        <Dropdown className='list' wrapSelection placeholder='Select Note' fluid selection options={noteList} />

      </div>
    );
  }
}

export default Sidebar;
