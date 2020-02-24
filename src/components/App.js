import React from 'react';
import { Switch, Route } from 'react-router-dom'; 

import Header from './Header'; 
import StreamCreate from './streams/StreamCreate'; 
import StreamList from './streams/StreamList'; 
import StreamEdit from './streams/StreamEdit'; 
import StreamDelete from './streams/StreamDelete'; 
import StreamShow from './streams/StreamShow'; 


function App() {
  return (
    <div className="ui container">
      <Header/>
      <Switch>      
        <Route path="/" exact component={StreamList}></Route>
        <Route path="/streams/new" exact component={StreamCreate}></Route>
        <Route path="/streams/edit/:id" exact component={StreamEdit}></Route>
        <Route path="/streams/delete/:id" exact component={StreamDelete}></Route>
        <Route path="/streams/show" exact component={StreamShow}></Route>
      </Switch>
    </div>
  );
}

export default App;
