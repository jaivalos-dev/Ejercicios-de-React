// src/App.jsx

import './App.css';

import Counter from './Counter/Counter';
import UserList from './UserList/UserList';
import UserForm from './Weather/weather';

function App() {
  return (
    <div>
      <h1>Ejercicios de React</h1>
        <hr />
        <Counter />
        <hr />
        <UserList />
        <hr />
        <UserForm />
        <hr />
    </div>
  );
}

export default App;
