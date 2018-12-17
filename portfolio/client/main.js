import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';


// Just the standard meteor react stuff - nothing added here yet
import App from '../imports/ui/app.js'

Meteor.startup(() => {
  render(<App />, document.getElementById('myapp'));
});