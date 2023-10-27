import React from 'react';
import {Provider} from 'mobx-react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import words from './Words.json';
import Words from './components/Words/Words';
import CardWords from './components/Card/CardWords';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';

import store from './store';

const App = () => {
  return (
    <Router>
      <>
        <Header></Header>
        <div>
          <Provider {...store}>
            <Routes>
              <Route path="/" element={<Words/>} />
              <Route path="/card" element={<CardWords words={words}/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </Provider>
        </div>
      </>
    </Router>
  );
}

export default App;
