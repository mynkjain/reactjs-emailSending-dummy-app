import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';
import UserForm from './component/UserForm';

function App() {
  return (
    <div className="container">
      <UserForm />
    </div>
  );
}

export default App;
