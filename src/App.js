import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './snackbar.css';

import Header from './components/Header';
import NotesWrapper from './components/NotesWrapper';
import About from './components/About';

function App() {
  return (
    <Router>
      <Header />
      <Route exact path='/' render={
        () => (
          <React.Fragment>
            <NotesWrapper toastMessage={toastMessage} />
            <div id="snackbar"></div>
          </React.Fragment>
        )
      } />

      <Route path='/about' component={About} />
    </Router>
  );
}

function toastMessage(message = '', type = 'success') {
  let snackbar = document.getElementById('snackbar');

  snackbar.innerHTML = message;

  snackbar.className = `show alert alert-${type}`;

  // Hide the element if the user clicked on it.
  snackbar.addEventListener('click', () => snackbar.className = snackbar.className.replace('show', ''));

  setTimeout(() => {
    snackbar.className = snackbar.className.replace('show', '');
  }, 3000);
}

export default App;
