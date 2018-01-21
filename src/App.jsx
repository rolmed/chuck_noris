import React from 'react';
import Chuck from './chuck.jsx';

const App = () => (
    <main className="container">
      <div>
        <h1>Chuck Facts</h1>
        <img className="container__image" alt="react logo" src='https://assets.chucknorris.host/img/chucknorris_logo_coloured_small@2x.png' />
      </div>
      <Chuck/>
    </main>
);

export default App;
