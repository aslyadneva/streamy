import React from 'react';
import { Switch, Route } from 'react-router-dom'; 

import Header from './Header'; 
import StreamCreate from './streams/StreamCreate'; 
import StreamList from './streams/StreamList'; 


function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route path="/streams/new" exact component={StreamCreate}></Route>
        <Route path="/streams" exact component={StreamList}></Route>
      </Switch>
    </div>
  );
}

export default App;
