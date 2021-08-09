import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContextProvider';
import { StatusContextProvider } from './context/StatusContextProvider';
import Routes from './components/Routes';
import Header from './components/Header';
import LoadingModal from './components/Modal/LoadingModal';

function App() {
  return (
    <div className="App">
      <Router>
        <StatusContextProvider>
        <AuthContextProvider>
          <Header />
          <Routes />
          <LoadingModal />      
        </AuthContextProvider>
        </StatusContextProvider>
      </Router>
    </div>
  );
}

export default App;
