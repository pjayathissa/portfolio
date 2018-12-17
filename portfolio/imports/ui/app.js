import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
 
//Styling
import 'tachyons'

import HomeScreen from './homescreen/homescreen.js'
import Demo from './homescreen/demo.js'


class App extends Component {


  render() {
    return (
          <Router>
            <div className='open-sans vh-100 flex flex-column'>
              <Switch>
                <Route exact path='/' component={HomeScreen} />
                <Route exact path='/demo' component={Demo} />
                <Redirect to='/' />
              </Switch>
            </div>
          </Router>

    )
  }
}

export default App

