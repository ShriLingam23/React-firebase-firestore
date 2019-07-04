import React from 'react';
import {BrowserRouter,Link,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Create from './components/Create';
import Edit from './components/Edit';
import Show from './components/Show';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/create' component={Create} />
        <Route path='/show/:id' component={Show} />
      </div>
    </BrowserRouter>
  );
}

export default App;
