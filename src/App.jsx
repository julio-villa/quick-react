import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const schedule = {
  title: "CS Courses for 2018-2019"
};

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1> {schedule.title} </h1>
      </header>
    </div>
  );
};

export default App;
