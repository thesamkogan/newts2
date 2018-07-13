import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';
import emoji from 'node-emoji'
// import '../semantic/dist/semantic.min.css';

// localStorage.removeItem('state');

const createEmptyNote = () => ({ title: emoji.random().emoji, content: '' });

const notes = (state = [createEmptyNote()], action) => {
  switch (action.type) {
    case 'CREATE_NOTE':
      return [...state, createEmptyNote()];
    case 'UPDATE_NOTE': {
      const { noteIndex, content, title } = action.payload;
      const nextState = state.slice();
      nextState[noteIndex] = Object.assign({}, state[noteIndex], { content, title });
      return nextState;
    }
    case 'DELETE_NOTE': {
      const nextState = state.slice();
      nextState.splice(action.payload.noteIndex, 1)
      return nextState;
    }
    default:
      return state;
  }
}

const noteIndex = (state = 0, action) => {
  if (action.type === 'SWITCH_NOTE' || action.type === 'CREATE_NOTE') return action.payload;
  if (action.type === 'DELETE_NOTE') return action.payload.nextNoteIndex;

  return state;
}

function persist({ getState }) {
  return next => action => {
    const returnValue = next(action);

    // console.log('persisting state:');
    localStorage.setItem('state', JSON.stringify(getState()));

    return returnValue
  }
}

const storedState = localStorage.getItem('state');
const initialState = storedState ? JSON.parse(storedState) : {};

const store = createStore(
  combineReducers({ notes, noteIndex }),
  initialState,
  applyMiddleware(persist)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
