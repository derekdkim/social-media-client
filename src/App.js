import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContextProvider';
import Routes from './components/Routes';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthContextProvider>
          <Header />
          <Routes />      
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
