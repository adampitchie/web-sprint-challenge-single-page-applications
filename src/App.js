import React from "react";
import { Route, Link, Switch } from 'react-router-dom'

import Home from './Home'
import PizzaForm from './PizzaForm'

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
    
      {
      <Switch>
        <Route path="/pizza">
          <PizzaForm />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    }
    </>
  );
};
export default App;
