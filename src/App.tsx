import React from 'react';
// import logo from './logo.svg';
import './App.css';
import User from './components/User/User';
import UserTable from './components/User/UserTable';
import "antd/dist/antd.css";
import Router from './routes';

function App() {
  return (
    <div className="App">
      <Router/>
    </div>
  );
}

export default App;
